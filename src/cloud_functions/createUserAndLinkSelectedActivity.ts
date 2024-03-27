import functions from "@react-native-firebase/functions";
import craschlytics from "@react-native-firebase/crashlytics";
import { Alert } from "react-native";
import { resetPass } from "../firebase-functions/updateTS/resetPasswordFunction";

import { Activity, User } from "../utility/types";
import { UserNewAccount } from "../screens/CreateUser";

export async function createUserAndLinkSelectedActivity(
  user: UserNewAccount,
  activityId: Activity["id"],
  setLoading: (loading: boolean) => void,
  navigation: any,
) {
  try {
    setLoading(true);
    var createUser = functions().httpsCallable("createUser");
    let res = await createUser({
      firstName: user.name,
      lastName: user.surname,
      email: user.email,
      password: user.password,
      role: user.role,
      activityId: activityId,
    });

    let newUser = res.data.createdUser;

    const sendLinkToResetPasswordToUser = await resetPass(user.email);
    setLoading(false);
    alertUser(
      `Användaren '${newUser.first_name} ${newUser.last_name}' har skapats!\n${sendLinkToResetPasswordToUser}`,

      false,
      navigation,
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
}

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
