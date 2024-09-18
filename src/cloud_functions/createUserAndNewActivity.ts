import craschlytics from "@react-native-firebase/crashlytics";
import functions from "@react-native-firebase/functions";
import { Alert } from "react-native";
import Config from "react-native-config";
import { addActivity } from "../firebase-functions/add";
import { resetPass } from "../firebase-functions/updateTS/resetPasswordFunction";
import { UserNewAccount } from "../screens/CreateUser";
import {
  FirebaseActivityType,
  FirebaseUserType,
} from "../utility/firebaseTypes";
import { Activity } from "../utility/types";
const project =
  Config.NODE_ENV === "prod"
    ? "do-good-get-good-2f6cc"
    : "dev-do-good-get-good";

export const createUserAndNewActivity = async (
  newActivity: FirebaseActivityType,
  newUser: UserNewAccount,
  allActiveActvivitiesFB: Activity[],
  setAllActiveActvivitiesFB: (activity: Activity[]) => void,
  navigation: () => void
) => {
  try {
    let createdActivityId = await addActivity(newActivity);
    setAllActiveActvivitiesFB([
      ...allActiveActvivitiesFB,
      {
        id: createdActivityId,
        active: newActivity.active_status,
        title: newActivity.activity_title,
        city: newActivity.activity_city,
        place: newActivity.activity_place,
        description: newActivity.activity_description,
        photo: newActivity.activity_photo,
        popular: newActivity.tg_favorite,
      },
    ]);

    await createNewUser(
      newUser,
      createdActivityId,
      newActivity.activity_title,
      navigation
    );
  } catch (error: any) {
    craschlytics().log("Error creating activity");
    craschlytics().recordError(error);
    Alert.alert(
      "Ett fel uppstod! Det gick inte att skapa aktiviteten",
      error.message
    );
  }
};

const createNewUser = async (
  newUser: UserNewAccount,
  createdActivityId: Activity["id"],
  newActivityTitle: FirebaseActivityType["activity_title"],
  navigation: () => void
) => {
  try {
    const createUser = functions().httpsCallableFromUrl(
      `https://europe-north1-${project}.cloudfunctions.net/createUserSecondGen`
    );

    const res = await createUser({
      firstName: newUser.name,
      lastName: newUser.surname,
      email: newUser.email,
      password: newUser.password,
      role: newUser.role,
      activityId: createdActivityId,
    });

    let createdUser = res.data.createdUser;
    return await sendResetPasswordOrShowError(
      newUser.email,
      newActivityTitle,
      createdUser,
      navigation
    );
  } catch (error: any) {
    craschlytics().log(
      "Creating activity was successful, but creating user caused an error"
    );
    craschlytics().recordError(error);
    Alert.alert(
      "Ett fel uppstod! Det gick inte att skapa användaren",
      error.message
    );
  }
};

const sendResetPasswordOrShowError = async (
  email: UserNewAccount["email"],
  newActivityTitle: FirebaseActivityType["activity_title"],
  createdUser: any,
  navigation: () => void
) => {
  if (createdUser) {
    const sendLinkToResetPasswordToUser = await resetPass(email);
    alertPopUp(
      newActivityTitle,
      createdUser,
      navigation,
      sendLinkToResetPasswordToUser
    );
  } else {
    Alert.alert("Kunde inte skapa användare");
    console.log(createdUser.error);
  }
};

function alertPopUp(
  title: string,
  user: FirebaseUserType,
  navigation: any,
  messageAboutLink: string
) {
  let alertTitle = "Skapa aktivitet och användare";
  let alertMessage = `Aktiviteten '${title}' och användaren '${user.first_name} ${user.last_name}' har skapats!\n${messageAboutLink}`;

  Alert.alert(alertTitle, alertMessage, [
    {
      text: "OK",
      onPress: () => navigation.navigate("AdminPage"),
    },
  ]);
}
