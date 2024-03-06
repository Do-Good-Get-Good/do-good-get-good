import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { TimeEntry, User } from "../../utility/types";
import { format } from "date-fns";
import { FirebaseuserActivityAndAccumulatedTime } from "../typeFirebase";

const userActivitiesAndAccumulatedTime = (
  arr: FirebaseuserActivityAndAccumulatedTime[],
): User["activitiesAndAccumulatedTime"] => {
  let temArr: User["activitiesAndAccumulatedTime"] = [];
  arr.forEach((item) =>
    temArr.push({
      accumulatedTime: item.accumulated_time,
      activityID: item.activity_id,
    }),
  );
  return temArr;
};

const userObject = (
  doc:
    | FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
    | FirebaseFirestoreTypes.DocumentData,
) => {
  let user: User = {
    id: doc.id,
    activitiesAndAccumulatedTime: userActivitiesAndAccumulatedTime(
      doc.data().activities_and_accumulated_time,
    ),
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
const timeEntryObject = (
  doc:
    | FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
    | FirebaseFirestoreTypes.DocumentData,
) => {
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
};

export const getAllUsersData = async () => {
  try {
    let querySnapshot = await firestore().collection("Users").get();

    if (querySnapshot.empty)
      throw new Error(
        "No users were found. Please create users before trying again!",
      );

    let allUsers: Array<User> = [];
    querySnapshot.docs.forEach((doc) => {
      allUsers.push(userObject(doc));
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
      return timeEntryObject(doc);
    });

    return Promise.resolve(timeEntries);
  } catch (error) {
    return Promise.reject(error);
  }
};
export const getUserUnconfirmedTimeEntries = async (uid: User["id"]) => {
  try {
    let querySnapshot = await firestore()
      .collection("timeentries")
      .where("user_id", "==", uid)
      .where("status_confirmed", "==", false)
      .get();

    let data = querySnapshot?.docs.map((doc) => {
      return timeEntryObject(doc);
    });
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllUsersConnectedToAdmin = async (adminId: User["id"]) => {
  try {
    let userData = await firestore()
      .collection("Users")
      .where("admin_id", "==", adminId)
      .get();

    if (userData.empty)
      throw new Error("There was an error fetching all user data");

    let data = userData.docs.map((doc) => {
      return userObject(doc);
    });
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};
