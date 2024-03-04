import { useNetInfo } from "@react-native-community/netinfo";
import { TimeEntry, User } from "../../utility/types";
import {
  confirmTimeEntry,
  incrementTotalHoursForMonthYearAccumulatedTime,
} from "../../firebase-functions/updateTS/update";
import { getUserData } from "../../firebase-functions/getTS/get";
import auth from "@react-native-firebase/auth";
import { FirebaseuserActivityAndAccumulatedTime } from "../../firebase-functions/typeFirebase";

let today = new Date();

const isCurrenMonth = (timeEntryMonth: number) =>
  today.getMonth() === timeEntryMonth;
const isCurrenYear = (timeEntryYear: number) =>
  today.getFullYear() === timeEntryYear;

// TODO: we should fix it so that it runs automatically on cloud
const incremenAccumulatedTime = (user: User, timeEntry: TimeEntry) => {
  let activitiesAndAccumulatedTime = user.activitiesAndAccumulatedTime;
  let addaptedArrayForFirebase: FirebaseuserActivityAndAccumulatedTime[] = [];

  activitiesAndAccumulatedTime.forEach((item) => {
    addaptedArrayForFirebase.push({
      accumulated_time:
        item.activityID === timeEntry.activityID
          ? item.accumulatedTime + timeEntry.time
          : item.accumulatedTime,
      activity_id: item.activityID,
    });
  });

  return addaptedArrayForFirebase;
};

// TODO: we should fix it so that it runs automatically on cloud
const addTotalConfirmedHoursAfterApproveTimeEntries = async (
  timeEntry: TimeEntry,
  user: User,
): Promise<void> => {
  const accumulatedTime: FirebaseuserActivityAndAccumulatedTime[] =
    incremenAccumulatedTime(user, timeEntry);

  const timeEntryMonth = new Date(timeEntry.date).getMonth();
  const timeEntryYear = new Date(timeEntry.date).getFullYear();
  const incrementMonth = isCurrenMonth(timeEntryMonth) ? timeEntry.time : 0;
  const incrementYear = isCurrenYear(timeEntryYear) ? timeEntry.time : 0;

  incrementTotalHoursForMonthYearAccumulatedTime(
    user.id,
    incrementMonth,
    incrementYear,
    accumulatedTime,
  );
};

export const useApproveTimeEntry = () => {
  const inetInfo = useNetInfo();
  const uid = auth().currentUser?.uid;

  const onApproveTimeEntries = async (
    timeEntries: TimeEntry[],
    approvedBy: User["id"],
  ): Promise<TimeEntry[]> => {
    let approvedTimeEnties: TimeEntry[] = [];
    if (inetInfo.isConnected) {
      for (const timeEntry of timeEntries) {
        const user = await getUserData(timeEntry.userID);
        if (user && uid !== user.id) {
          await confirmTimeEntry(timeEntry.id, approvedBy);
          await addTotalConfirmedHoursAfterApproveTimeEntries(timeEntry, user);

          approvedTimeEnties.push(timeEntry);
        }
      }
    }
    return approvedTimeEnties;
  };

  return { onApproveTimeEntries };
};
