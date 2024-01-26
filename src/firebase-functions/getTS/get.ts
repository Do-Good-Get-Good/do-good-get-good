import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { TimeEntry, User } from "../../utilily/types";
import { format } from "date-fns";

// FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>.data(): FirebaseFirestoreTypes.DocumentData | undefined

const userObject = (
  doc:
    | FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
    | FirebaseFirestoreTypes.DocumentData,
) => {
  let user: User = {
    id: doc.id,
    activitiesAndAccumulatedTime: doc.data().activities_and_accumulated_time,
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
  return user;
};

export const getAllUsersData = async () => {
  try {
    let querySnapshot = await firestore().collection("Users").get();

    if (querySnapshot.empty)
      throw new Error(
        "No users were found. Please create users before trying again!",
      );

    let allUsers: Array<User> = querySnapshot.docs.map((doc) => {
      return userObject(doc);
    });

    return Promise.resolve(allUsers);
  } catch (error) {
    Promise.reject(error);
  }
};

export const getUserData = async (userId: User["id"]) => {
  try {
    let data = await firestore().collection("Users").doc(userId).get();
    let user = userObject(data);

    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllUnconfirmedTimeEntries = async () => {
  try {
    let querySnapshot = await firestore()
      .collection("timeentries")
      .orderBy("date", "desc")
      .where("status_confirmed", "==", false)
      .get();

    let timeEntries: Array<TimeEntry> = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        activityID: doc.data().activity_id,
        adminID: doc.data().admin_id,
        userID: doc.data().user_id,
        activityTitle: doc.data().activity_title,
        date: format(doc.data().date.toDate(), "yyyy-MM-dd"),
        statusConfirmed: doc.data().status_confirmed,
        time: doc.data().time,
      };
    });

    return Promise.resolve(timeEntries);
  } catch (error) {
    return Promise.reject(error);
  }
};
