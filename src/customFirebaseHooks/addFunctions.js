import firestore from "@react-native-firebase/firestore";

export const addActivity = async (activity) => {
  try {
    const newActivity = await firestore()
      .collection("Activities")
      .add(activity);

    return Promise.resolve(newActivity.id);
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
