import firestore from "@react-native-firebase/firestore";

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
    return Promise.resolve(userData);
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
