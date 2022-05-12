import firestore from "@react-native-firebase/firestore";

export const getAllInactiveActivities = async () => {
  let activities = null;
  await firestore()
    .collection("Activities")
    .where("active_status", "==", false)
    .get()
    .then((res) => {
      activities = res;
    })
    .catch((error) => {
      console.log("errorMessage ", error);
    });
  return activities;
};

export const getAllActiveActivities = async () => {
  let activities = null;
  await firestore()
    .collection("Activities")
    .where("active_status", "==", true)
    .get()
    .then((res) => {
      activities = res;
    })
    .catch((error) => {
      console.log("errorMessage ", error);
    });
  return activities;
};

export const getFaq = async () => {
  let response = null;
  await firestore()
    .collection("faq")
    .get()
    .then((querySnapshot) => {
      response = querySnapshot;
    });
  return response;
};

export const getActivitiesMatchTimeEntries = async (timeEntry) => {
  let response = await firestore()
    .collection("Activities")
    .doc(timeEntry.data().activity_id)
    .get()
    .catch((error) => {
      console.log("errorMessage ", error);
    });
  return response;
};
