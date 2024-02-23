import firestore from "@react-native-firebase/firestore";
import { TimeEntry, User } from "../../utility/types";

const addTotalConfirmedHours = (user) => {
  let today = new Date();
  let currentYear = today.getFullYear();
  let currentMonth = today.getMonth();
  let accumulatedTime = addAccumulatedTime(user);

  let timeEntryMonth = new Date(user.timeEntryDate).getMonth();
  let timeEntryYear = new Date(user.timeEntryDate).getFullYear();

  if (currentMonth === timeEntryMonth && currentYear === timeEntryYear) {
    incrementTotalConfirmedHoursForUser(user.userID, user.timeEntryHours);
    incrementYearlyTotalHoursForUser(user.userID, user.timeEntryHours);
    updateUsersActivitiesAndAccumulatedTime(user.userID, accumulatedTime);
  } else if (currentMonth !== timeEntryMonth && currentYear === timeEntryYear) {
    incrementYearlyTotalHoursForUser(user.userID, user.timeEntryHours);
    updateUsersActivitiesAndAccumulatedTime(user.userID, accumulatedTime);
  }
};

export const confirmTimeEntry = async (
  timeEntryID: TimeEntry["id"],
  approvedBy: User["id"],
) => {
  try {
    let response = await firestore()
      .collection("timeentries")
      .doc(timeEntryID)
      .update({
        status_confirmed: true,
        approved_by: approvedBy,
      });
    return Promise.resolve(response);
  } catch (error) {
    console.log("There was an error confirming the timeentry");
    return Promise.reject(error);
  }
};
