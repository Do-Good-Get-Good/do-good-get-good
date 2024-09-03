import firestore from "@react-native-firebase/firestore";
import { Activity, TimeEntry, User } from "../../utility/types";
import { activityObject, timeEntryObject, userObject } from "../adaptedObject";

export const getAllUsersData = async () => {
  try {
    let querySnapshot = await firestore().collection("Users").get();

    if (querySnapshot.empty)
      throw new Error(
        "No users were found. Please create users before trying again!"
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

export const getUserUnconfirmedTimeEntries = async (
  uid: User["id"]
): Promise<TimeEntry[]> => {
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

export const getUsersFiveNewestTimeEntries = async (
  userId: User["id"]
): Promise<TimeEntry[]> => {
  try {
    let querySnapshot = await firestore()
      .collection("timeentries")
      .where("user_id", "==", userId)
      .where("status_confirmed", "==", true)
      .orderBy("date", "desc")
      .limit(5)
      .get();

    let data = querySnapshot?.docs.map((doc) => {
      return timeEntryObject(doc);
    });
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};
export const getAllUsersConnectedToAdmin = async (
  adminId: User["id"]
): Promise<User[]> => {
  try {
    let userData = await firestore()
      .collection("Users")
      .where("admin_id", "==", adminId)
      .get();

    let data = userData?.docs
      ? userData.docs.map((doc) => {
          return userObject(doc);
        })
      : [];

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUserByStatus = async (isActive: boolean = true) => {
  try {
    let querySnapshot = await firestore()
      .collection("Users")
      .where("status_active", "==", isActive)
      .get();

    if (querySnapshot.empty) throw new Error(`No users were found.`);

    let users = querySnapshot.docs.map((doc) => {
      return userObject(doc);
    });
    return Promise.resolve(users);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getActivityByID = async (
  activityID: Activity["id"]
): Promise<Activity | null> => {
  try {
    let data = await firestore().collection("Activities").doc(activityID).get();
    return Promise.resolve(activityObject(data));
  } catch (error) {
    console.log("getActivityByID: ", error);
    return null;
  }
};

export const getActivityInformation = async (activityId: Activity["id"]) => {
  try {
    let querySnapshot = await firestore()
      .collection("Activities")
      .doc(activityId)
      .get();

    let activity = null;
    if (querySnapshot?.data()) {
      activity = {
        id: activityId,
        title: querySnapshot?.data()?.activity_title,
        city: querySnapshot?.data()?.activity_city,
        photo: querySnapshot?.data()?.activity_photo,
        imageUrl: querySnapshot?.data()?.imageUrl,
      };
    }

    return Promise.resolve(activity);
  } catch (error) {
    console.log(Promise.reject(error));
    return null;
  }
};
