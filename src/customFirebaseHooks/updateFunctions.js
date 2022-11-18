import firestore from "@react-native-firebase/firestore";

export const updateTimeEntry = async (timeEntryID, date, hours) => {
  try {
    let response = await firestore()
      .collection("timeentries")
      .doc(timeEntryID)
      .update({
        date: date,
        time: hours,
      });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export function updateUsersTotalMonthlyHours(uid, hours) {
  try {
    firestore()
      .collection("Users")
      .doc(uid)
      .update({
        total_hours_month: firestore.FieldValue.increment(hours),
      });
  } catch (error) {
    console.log("errorMessage ", error);
  }
}

export const incrementTotalHoursForUser = (uid, hours) => {
  try {
    firestore()
      .collection("Users")
      .doc(uid)
      .update({
        total_hours_month: firestore.FieldValue.increment(hours),
      });
  } catch (error) {
    console.log("errorMessage ", error);
  }
};

export const decrementTotalHoursForUser = (uid, hours) => {
  try {
    firestore()
      .collection("Users")
      .doc(uid)
      .update({
        total_hours_month: firestore.FieldValue.increment(-hours),
      });
  } catch (error) {
    console.log("errorMessage ", error);
  }
};

export const superAdminUpdatesUserInfo = async (newChangesInUserInfo) => {
  try {
    console.log("newChangesInUserInfo  ", newChangesInUserInfo);
    firestore().collection("Users").doc(newChangesInUserInfo.docId).update({
      first_name: newChangesInUserInfo.firstName,
      last_name: newChangesInUserInfo.lastName,
      status_active: newChangesInUserInfo.statusActive,
      role: newChangesInUserInfo.role,
      admin_id: newChangesInUserInfo.adminId,
    });
    console.log("Super admin update user data");
  } catch (error) {
    console.log(error);
  }
};
