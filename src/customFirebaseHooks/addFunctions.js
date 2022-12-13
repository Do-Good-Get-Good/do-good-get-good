import firestore from "@react-native-firebase/firestore";

export const addActivities = async (newFirebaseActivity) => {
  try {
    const res = await firestore()
      .collection("Activities")
      .add(newFirebaseActivity);
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addTimeEntry = async (timeEntry) => {
  try {
    const res = await firestore().collection("timeentries").add(timeEntry);
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
};
