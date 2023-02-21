import { Alert } from "react-native";
import functions from "@react-native-firebase/functions";
import craschlytics from "@react-native-firebase/crashlytics";
import { addActivity } from "../firebase-functions/add";
import adminStore from "../store/adminStore";

export async function createUserAndNewActivity(
  newActivity,
  newUser,
  setAllActiveActvivitiesFB,
  setLoading,
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

      let userInfo = {
        firstName: createdUser.first_name,
        lastName: createdUser.last_name,
        timeEntries: [],
        isOpen: false,
        statusActive: createdUser.status_active,
        userID: createdUser.id,
        timeObject: {
          paidTime: createdUser.total_confirmed_hours,
          timeForYear: createdUser.total_hours_year,
          currentForMonth: createdUser.total_hours_month,
        },
      };
      console.log(res);

      // Save new user locally
      adminStore.addNewUser(userInfo);

      setLoading(false);
      alertPopUp(newActivity.activity_title, createdUser, navigation);
    } catch (error) {
      craschlytics().log(
        "Creating activity was successful, but creating user caused an error"
      );
      craschlytics().recordError(error);
      setLoading(false);
      Alert.alert(
        "Ett fel uppstod! Det gick inte att skapa användaren",
        error.message
      );
    }
  } catch (error) {
    craschlytics().log("Error creating activity");
    craschlytics().recordError(error);
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
