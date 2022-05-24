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

export const superAdminUpdatesUserInfo = async (newChangesInUserInfo) => {
  let success = null;
  let error = null;
  console.log("newChangesInUserInfo  ", newChangesInUserInfo);
  await firestore()
    .collection("Users")
    .doc(newChangesInUserInfo.doc_id)
    .update({
      first_name: newChangesInUserInfo.first_name,
      last_name: newChangesInUserInfo.last_name,
      status_active: newChangesInUserInfo.status_active,
      role: newChangesInUserInfo.role,
      admin_id: newChangesInUserInfo.admin_id,
    })
    .then(() => {
      success = true;
      console.log("Super admin update user data");
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
