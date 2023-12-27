import firestore from "@react-native-firebase/firestore";
import { User } from "../../utilily/types";
export const getAllUsersData = async () => {
  try {
    let querySnapshot = await firestore().collection("Users").get();

    if (querySnapshot.empty)
      throw new Error(
        "No users were found. Please create users before trying again!",
      );

    let allUsers: Array<User> = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        activitiesAndAccumulatedTime:
          doc.data().activities_and_accumulated_time,
        adminID: doc.data().admin_id,
        connectedActivities: doc.data().connected_activities,
        firstName: doc.data().first_name,
        lastName: doc.data().last_name,
        role: doc.data().role,
        statusActive: doc.data().status_active,
        totalConfirmedHours: doc.data().total_confirmed_hours,
        totalHoursMonth: doc.data().total_hours_month,
        totalHoursYear: doc.data().total_hours_year,
      };
    });

    return Promise.resolve(allUsers);
  } catch (error) {
    Promise.reject(error);
  }
};
