import firestore from "@react-native-firebase/firestore"

export function updateUsersTotalMonthlyHours(uid, hours) {
    firestore()
        .collection("Users")
        .doc(uid)
        .update({
          total_hours_month: firestore.FieldValue.increment(hours),
        })
        .catch((error) => {
          console.log("errorMessage ", error);
    })
}

export const getUserTimeEntriesOrderByDate = async (uid, startPoint) => {
  let response = null
  await firestore()
    .collection("timeentries")
    .where("user_id", "==", uid)
    .orderBy("date", "desc")
    .startAfter(startPoint)
    .limit(20)
    .get()
    .then((res) => {
      response = res
    })
    return response
}