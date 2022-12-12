import firestore from "@react-native-firebase/firestore";

export const getUserLevel = async (userId) => {
  try {
    let response = await firestore().collection("Users").doc(userId).get();
    return Promise.resolve(response.data().role);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUserData = async (userId) => {
  try {
    let data = await firestore().collection("Users").doc(userId).get();
    return Promise.resolve(data.data());
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllUsersConnectedToAdmin = async (adminId) => {
  try {
    let userData = await firestore()
      .collection("Users")
      .where("admin_id", "==", adminId)
      .get();

    if (userData.empty)
      throw new Error("There was an error fetching all user data");

    let data = userData.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllUsersNotConnectedToAdmin = async (adminId, activityId) => {
  try {
    let querySnapshot = await firestore()
      .collection("Users")
      .where("admin_id", "!=", adminId)
      .where("connected_activities", "array-contains", activityId)
      .get();

    let otherUsers = querySnapshot.docs.map((doc) => {
      return {
        fullName: `${doc.data().first_name} ${doc.data().last_name}`,
      };
    });

    return Promise.resolve(otherUsers);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllUsersData = async () => {
  try {
    let querySnapshot = await firestore().collection("Users").get();

    if (querySnapshot.empty)
      throw new Error(
        "No users were found. Please create users before trying again!"
      );

    let allUsers = querySnapshot.docs.map((doc) => {
      return {
        activitiesAndAccumulatedTime:
          doc.data().activities_and_accumulated_time,
        adminId: doc.data().admin_id,
        connectedActivities: doc.data().connected_activities,
        docId: doc.id,
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

export const getAllActivitiesWithStatus = async (status) => {
  try {
    let querySnapshot = await firestore()
      .collection("Activities")
      .where("active_status", "==", status)
      .get();

    let activities = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        title: doc.data().activity_title,
        active: doc.data().active_status,
        city: doc.data().activity_city,
        place: doc.data().activity_place,
        description: doc.data().activity_description,
        photo: doc.data().activity_photo,
        popular: doc.data().tg_favorite,
      };
    });

    return Promise.resolve(activities);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllFavoriteActivities = async () => {
  try {
    let querySnapshot = await firestore()
      .collection("Activities")
      .where("tg_favorite", "==", true)
      .get();

    let favoriteActivities = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        title: doc.data().activity_title,
        city: doc.data().activity_city,
        place: doc.data().activity_place,
        description: doc.data().activity_description,
        photo: doc.data().activity_photo,
        popular: doc.data().tg_favorite,
      };
    });

    return Promise.resolve(favoriteActivities);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getFaq = async () => {
  try {
    const querySnapshot = await firestore().collection("faq").get();
    return Promise.resolve(querySnapshot);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getActivitiesMatchTimeEntries = async (timeEntry) => {
  try {
    let documentSnapshot = await firestore()
      .collection("Activities")
      .doc(timeEntry.data().activity_id)
      .get();
    return Promise.resolve(documentSnapshot);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUsersFiveNewestTimeEntries = async (userId) => {
  try {
    let querySnapshot = await firestore()
      .collection("timeentries")
      .where("user_id", "==", userId)
      .where("status_confirmed", "==", true)
      .orderBy("date", "desc")
      .limit(5)
      .get();

    if (querySnapshot.empty)
      console.log(`User '${userId}' has no confirmed time entries.`);

    let timeEntryData = querySnapshot.docs.map((doc) => doc.data());

    return Promise.resolve(timeEntryData);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getTenLastConfirmedTimeEntries = async () => {
  try {
    let querySnapshot = await firestore()
      .collection("timeentries")
      .orderBy("date", "desc")
      .where("status_confirmed", "==", true)
      .limit(10)
      .get();
    return Promise.resolve(querySnapshot);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getConcept = async () => {
  try {
    let querySnapshot = await firestore().collection("concept").get();
    return Promise.resolve(querySnapshot);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUserTimeEntriesOrderByDate = async (uid, startPoint) => {
  try {
    let querySnapshot = await firestore()
      .collection("timeentries")
      .where("user_id", "==", uid)
      .orderBy("date", "desc")
      .startAfter(startPoint)
      .limit(10)
      .get();

    if (querySnapshot.empty) throw new Error("No more data found!");

    let data = querySnapshot.docs.map((doc) => {
      return {
        adminID: doc.data().admin_id,
        timeEntryID: doc.id,
        date: doc.data().date.toDate(),
        statusConfirmed: doc.data().status_confirmed,
        time: doc.data().time,
        title: doc.data().activity_title,
        activityID: doc.data().activity_id,
      };
    });
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};
