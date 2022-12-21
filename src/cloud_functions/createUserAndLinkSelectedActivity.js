import functions from "@react-native-firebase/functions";
import { Alert } from "react-native";

export async function createUserAndLinkSelectedActivity(
  user,
  selectedActivity,
  setLoading,
  setUserData,
  setNewUser,
  navigation
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
      activityId: selectedActivity.id,
    });

    let newUser = res.data.createdUser;
    console.log(res);

    // Save new user locally
    setUserData((prev) => [...prev, newUser]);
    setNewUser(newUser);

    setLoading(false);

    alertUser(
      `Användaren '${newUser.first_name} ${newUser.last_name}' har skapats!`,
      false,
      navigation
    );
  } catch (error) {
    let message = "Error";
    setLoading(false);
    if (error === "auth/email-already-exists") {
      message = `Användaren '${user.email}' kunde inte skapas, en användare med den adressen finns redan`;
    } else {
      message = `Kunde inte skapa användare med epost '${user.email}'. \nError: '${error.message}'`;
    }
    alertUser(message, true, navigation);
  }
}

function alertUser(message, error, navigation) {
  Alert.alert("Skapa användare", message, [
    {
      text: "OK",
      onPress: () => {
        error === false && navigation.navigate("AdminPage");
      },
    },
  ]);
}
