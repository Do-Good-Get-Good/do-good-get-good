import reject from "lodash/reject";
import { getUserData } from "../../firebase-functions/getTS/get";
import {
  TimeEntry,
  User,
  UserAndUnapprovedTimeEntriesType,
} from "../../utility/types";

const findUserInfo = async (users: User[], userID: User["id"]) => {
  let findKeyValue = users.find((user) => user.id === userID);
  return findKeyValue ?? ((await getUserData(userID)) as User);
};

export const makeListOfUserAndUnapprovedTimeEntries = async (
  timeEntries: TimeEntry[],
  users: User[]
): Promise<UserAndUnapprovedTimeEntriesType[]> => {
  let tempArr: UserAndUnapprovedTimeEntriesType[] = [];

  for (const item of timeEntries) {
    const userEntry: TimeEntry[] = timeEntries.filter(
      (entry) => entry.userID === item.userID
    );

    const isAlreadyAdded = tempArr.some(
      (u) => u.unapprovedTimeEntries[0].userID === item.userID
    );

    if (!isAlreadyAdded) {
      const userInfo = await findUserInfo(users, item.userID);

      const adminInfo = await findUserInfo(users, userInfo.adminID ?? "");

      const obj: UserAndUnapprovedTimeEntriesType = {
        adminID: userInfo.adminID,
        userID: userInfo.id,
        adminFirstName: adminInfo?.firstName ?? "",
        adminLastName: adminInfo?.lastName ?? "",
        userFirstName: userInfo.firstName,
        userLastName: userInfo.lastName,
        unapprovedTimeEntries: userEntry,
      };

      tempArr.push(obj);
    }
  }
  return tempArr;
};
export const filterAfterApprovedTimeEntrirs = (
  prev: UserAndUnapprovedTimeEntriesType[],
  timeEntryID: TimeEntry["id"]
) =>
  prev
    .map((user) => ({
      ...user,
      unapprovedTimeEntries: reject(user.unapprovedTimeEntries, {
        id: timeEntryID,
      }) as TimeEntry[],
    }))
    .filter((user) => user.unapprovedTimeEntries.length > 0);
