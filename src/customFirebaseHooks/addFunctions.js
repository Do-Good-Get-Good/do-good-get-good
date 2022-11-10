import firestore from "@react-native-firebase/firestore";

export const addActivities = async (newFirebaseActivity) => {
  let activity = null;
  await firestore()
    .collection("Activities")
    .add(newFirebaseActivity)
    .then((newActivity) => {
      activity = newActivity;
    });
  return activity;
};

export const addTimeEntry = async (timeEntry) => {
  try {
    const res = await firestore().collection("timeentries").add(timeEntry);
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
};
