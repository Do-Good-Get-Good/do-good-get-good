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

export const getAllUserData = async (adminId) => {
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

export const getAllInactiveActivities = async () => {
  try {
    let querySnapshot = await firestore()
      .collection("Activities")
      .where("active_status", "==", false)
      .get();

    return Promise.resolve(querySnapshot);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllActiveActivities = async () => {
  try {
    let querySnapshot = await firestore()
      .collection("Activities")
      .where("active_status", "==", true)
      .get();

    return Promise.resolve(querySnapshot);
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
      throw new Error("There was an error fetching time entries.");

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
      .limit(20)
      .get();
    return Promise.resolve(querySnapshot);
  } catch (error) {
    return Promise.reject(error);
  }
};
