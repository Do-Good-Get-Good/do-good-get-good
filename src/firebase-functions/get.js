import firestore from "@react-native-firebase/firestore";

export const getMaxConfirmedHours = async () => {
  try {
    let res = await firestore()
      .collection("timeStatistics")
      .doc("settings")
      .get();

    return Promise.resolve(res.data().max_confirmed_hours);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUserLevel = async (userId) => {
  try {
    let response = await firestore().collection("Users").doc(userId).get();
    return Promise.resolve(response.data().role);
  } catch (error) {
    return Promise.reject(error);
  }
};

// getUserData exist in getTS. use that one instead and remove this one in the future
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
        id: doc.id,
        fullName: `${doc.data().first_name} ${doc.data().last_name}`,
        connectedActivities: doc.data().connected_activities,
      };
    });

    return Promise.resolve(otherUsers);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getActivityInformation = async (activityId) => {
  try {
    let querySnapshot = await firestore()
      .collection("Activities")
      .doc(activityId)
      .get();

    let activity = {
      id: activityId,
      title: querySnapshot.data().activity_title,
      city: querySnapshot.data().activity_city,
      photo: querySnapshot.data().activity_photo,
      imageUrl: querySnapshot.data().imageUrl,
    };

    return Promise.resolve(activity);
  } catch (error) {
    console.log(Promise.reject(error));
    return null;
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
        imageUrl: doc.data().imageUrl,
      };
    });

    return Promise.resolve(activities);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllActivities = async () => {
  try {
    let querySnapshot = await firestore()
      .collection("Activities")
      .orderBy("user_count", "desc")
      .get();

    let allActivities = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        title: doc.data().activity_title,
        city: doc.data().activity_city,
        place: doc.data().activity_place,
        description: doc.data().activity_description,
        photo: doc.data().activity_photo,
        popular: doc.data().tg_favorite,
        imageUrl: doc.data().imageUrl,
      };
    });

    return Promise.resolve(allActivities);
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

    let activity = {
      title: documentSnapshot.data().activity_title,
      photo: documentSnapshot.data().activity_photo,
      city: documentSnapshot.data().activity_city,
      imageUrl: documentSnapshot.data().imageUrl,
    };

    return Promise.resolve(activity);
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
    let timeEntryData = [];

    if (!querySnapshot.empty) {
      timeEntryData = querySnapshot.docs.map((doc) => doc.data());
    }
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

    let conceptData = querySnapshot.docs.map((doc) => ({
      order_id: doc.data().order_id,
      heading: doc.data().heading,
      body: doc.data().body,
    }));

    return Promise.resolve(conceptData);
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
