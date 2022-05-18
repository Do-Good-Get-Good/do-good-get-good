import firestore from "@react-native-firebase/firestore";

export const deleteTimeEntry = async (timeEntryID) => {
  let success = null;
  let error = null;

  await firestore()
    .collection("timeentries")
    .doc(timeEntryID)
    .delete()
    .then(() => {
      success = true;
    })
    .catch((err) => {
      success = false;
      error = {
        firebaseError: err,
        message: "Sorry, something went wrong",
      };
    });

  return {
    success: success,
    error: error,
  };
};
