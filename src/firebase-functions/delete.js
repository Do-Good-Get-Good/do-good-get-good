import firestore from "@react-native-firebase/firestore";

export const deleteTimeEntry = async (timeEntryID) => {
  try {
    const res = await firestore()
      .collection("timeentries")
      .doc(timeEntryID)
      .delete();
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteActivity = async (activityId) => {
  try {
    const res = await firestore()
      .collection("Activities")
      .doc(activityId)
      .delete();

    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
};
