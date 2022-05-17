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
