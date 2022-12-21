import { Alert } from "react-native";
import functions from "@react-native-firebase/functions";
import { addActivity } from "../firebase-functions/add";

export async function createUserAndNewActivity(
  newActivity,
  newUser,
  setAllActiveActvivitiesFB,
  setLoading,
  setUserData,
  setNewUser,
  navigation
) {
  try {
    setLoading(true);
    let createdActivityId = await addActivity(newActivity);
    setAllActiveActvivitiesFB((prev) => [
      ...prev,
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

    try {
      var createUser = functions().httpsCallable("createUser");
      let res = await createUser({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
        activityId: createdActivityId,
      });

      let createdUser = res.data.createdUser;

      // Save new user locally
      setUserData((prev) => [...prev, createdUser]);
      setNewUser(createdUser);

      setLoading(false);
      alertPopUp(newActivity.activity_title, createdUser, navigation);
    } catch (error) {
      setLoading(false);
      Alert.alert(
        "Ett fel uppstod! Det gick inte att skapa användaren",
        error.message
      );
    }
  } catch (error) {
    setLoading(false);
    Alert.alert(
      "Ett fel uppstod! Det gick inte att skapa aktiviteten",
      error.message
    );
  }
}

function alertPopUp(title, user, navigation) {
  let alertTitle = "Skapa aktivitet och användare";
  let alertMessage = `Aktiviteten '${title}' och användaren '${user.first_name} ${user.last_name}' har skapats!`;

  Alert.alert(alertTitle, alertMessage, [
    {
      text: "OK",
      onPress: () => {
        navigation.navigate("AdminPage");
      },
    },
  ]);
}
