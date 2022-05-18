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
  let success;
  let error;

  await firestore()
    .collection("timeentries")
    .add(timeEntry)
    .then(() => {
      success = true;
    })
    .catch((error) => {
      success = false;
      error = {
        firebaseError: error,
        message: "Sorry, something went wrong",
      };
    });

  return {
    success: success,
    error: error,
  };
};
