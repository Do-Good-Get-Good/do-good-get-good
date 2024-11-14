import craschlytics from "@react-native-firebase/crashlytics";
import functions from "@react-native-firebase/functions";
import { Alert } from "react-native";
import { resetPass } from "../firebase-functions/updateTS/resetPasswordFunction";

import { getProject } from "../lib/project";
import { UserNewAccount } from "../screens/CreateUser";
import { Activity } from "../utility/types";

export const createUserAndLinkSelectedActivity = async (
  user: UserNewAccount,
  activityId: Activity["id"],
  setLoading: (loading: boolean) => void,
  navigation: any
) => {
  try {
    setLoading(true);
    const createUser = functions().httpsCallableFromUrl(
      `https://europe-north1-${getProject()}.cloudfunctions.net/createUserSecondGen`
    );
    const res = await createUser({
      firstName: user.name,
      lastName: user.surname,
      email: user.email,
      password: user.password,
      role: user.role,
      activityId: activityId,
    });

    let newUser = res.data.createdUser;
    await sendResetPasswordOrShowError(
      newUser,
      user.email,
      setLoading,
      navigation
    );
  } catch (error: any) {
    let message;
    if (error === "auth/email-already-exists") {
      message = `En användare med e-post '${user.email}' existerar redan`;
    } else {
      message = `Kunde inte skapa användare med epost '${user.email}'. \nError: '${error.message}'`;
      craschlytics().log("Error creating account and linking activity");
      craschlytics().recordError(error);
    }
    setLoading(false);
    alertUser(message, true, navigation);
  }
};

const sendResetPasswordOrShowError = async (
  newUser: any,
  email: UserNewAccount["email"],
  setLoading: (loading: boolean) => void,
  navigation: any
) => {
  if (newUser) {
    const sendLinkToResetPasswordToUser = await resetPass(email);
    setLoading(false);
    alertUser(
      `Användaren '${newUser.first_name} ${newUser.last_name}' har skapats!\n${sendLinkToResetPasswordToUser}`,

      false,
      navigation
    );
  } else {
    alertUser("Kunde inte skapa användare", true, navigation);
    console.log(newUser.error);
  }
};

function alertUser(message: string, error: boolean, navigation: any) {
  Alert.alert("Skapa användare", message, [
    {
      text: "OK",
      onPress: () => {
        error === false && navigation.navigate("AdminPage");
      },
    },
  ]);
}
