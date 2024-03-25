import functions from "@react-native-firebase/functions";
import craschlytics from "@react-native-firebase/crashlytics";
import { Alert } from "react-native";
import { resetPass } from "../firebase-functions/updateTS/resetPasswordFunction";

import adminStore from "../store/adminStore";
import { Activity, User } from "../utility/types";
import { UserNewAccount } from "../screens/CreateUser";

export async function createUserAndLinkSelectedActivity(
  user:UserNewAccount,
  activityId:Activity["id"],
  setLoading: (loading:boolean)=>void,
  navigation: any
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

    let userInfo = {
      firstName: newUser.first_name,
      lastName: newUser.last_name,
      timeEntries: [],
      isOpen: false,
      statusActive: newUser.status_active,
      userID: newUser.id,
      timeObject: {
        paidTime: newUser.total_confirmed_hours,
        timeForYear: newUser.total_hours_year,
        currentForMonth: newUser.total_hours_month,
      },
    };
    // console.log(res);

    // Save new user locally
    adminStore.addNewUser(userInfo);

    const sendLinkToResetPasswordToUser= await resetPass(user.email);
    setLoading(false);
    alertUser(

      `Användaren '${newUser.first_name} ${newUser.last_name}' har skapats!\n${sendLinkToResetPasswordToUser}`,
      
      false,
      navigation
    );
  } catch (error:any) {
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

function alertUser(message:string, error:boolean, navigation:any) {
 Alert.alert("Skapa användare", message, [
    {
      text: "OK",
      onPress: () => {
        error === false && navigation.navigate("AdminPage");
      },
    },
  ]);
}
