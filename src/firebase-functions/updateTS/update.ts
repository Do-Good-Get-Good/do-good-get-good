import firestore from "@react-native-firebase/firestore";
import {
  TimeEntry,
  User,
  UserAndUnapprovedTimeEntriesType,
} from "../../utility/types";
import { FirebaseuserActivityAndAccumulatedTime } from "../typeFirebase";

export const incrementTotalHoursForMonthYearAccumulatedTime = (
  userId: User["id"],
  confirmedHours: number,
  hoursThisYear: number,
  activitiesAndTime: FirebaseuserActivityAndAccumulatedTime[],
) => {
  try {
    firestore()
      .collection("Users")
      .doc(userId)
      .update({
        total_confirmed_hours: firestore.FieldValue.increment(confirmedHours),
        total_hours_year: firestore.FieldValue.increment(hoursThisYear),
        activities_and_accumulated_time: activitiesAndTime,
      });
  } catch (error) {
    console.log("There was an error incrementing total hours", error);
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
    // Normaly you need to use incrementTotalHoursForMonthYearAccumulatedTime after you run confirmTimeEntry. look useApproveTimeEntry
    // TODO: Make incrementTotalHoursForMonthYearAccumulatedTime as cloud function
    return Promise.resolve(response);
  } catch (error) {
    console.log("There was an error confirming the timeentry");
    return Promise.reject(error);
  }
};

export const updateUserAsAdmin = async (user: User) => {
  try {
    await firestore().collection("Users").doc(user.id).update({
      first_name: user.firstName,
      last_name: user.lastName,
      status_active: user.statusActive,
    });
  } catch (error) {
    console.log(error);
  }
};
