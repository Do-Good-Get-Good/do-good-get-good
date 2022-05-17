import firestore from "@react-native-firebase/firestore";

export const updateTimeEntry = async (timeEntryID, date, hours) => {
  let success = null;
  let error = null;

  await firestore()
    .collection("timeentries")
    .doc(timeEntryID)
    .update({
      date: date,
      time: hours,
    })
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

export const incrementTotalHoursForUser = (uid, hours) => {
  firestore()
    .collection("Users")
    .doc(uid)
    .update({
      total_hours_month: firestore.FieldValue.increment(hours),
    })
    .catch((error) => {
      console.log("errorMessage ", error);
    });
};

export const decrementTotalHoursForUser = (uid, hours) => {
  firestore()
    .collection("Users")
    .doc(uid)
    .update({
      total_hours_month: firestore.FieldValue.increment(-hours),
    })
    .catch((error) => {
      console.log("errorMessage ", error);
    });
};
