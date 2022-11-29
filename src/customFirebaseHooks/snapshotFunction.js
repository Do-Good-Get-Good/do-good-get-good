import firestore from "@react-native-firebase/firestore";

export const streamTimeEntriesForAdmin = (userId) => {
  return firestore()
    .collection("timeentries")
    .where("admin_id", "==", userId)
    .where("status_confirmed", "==", false)
    .orderBy("date", "desc");
};
