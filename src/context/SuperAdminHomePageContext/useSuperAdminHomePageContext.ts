import { getUserData } from "../../firebase-functions/getTS/get";
import {
  TimeEntry,
  User,
  UserAndUnapprovedTimeEntriesType,
} from "../../utilily/types";
import { useSuperAdminFunction } from "../SuperAdminContext";

import { confirmTimeEntry } from "../../firebase-functions/updateTS/update";
import { filter, isEmpty, reject, remove, set, find } from "lodash";
import { useSuperAdminHomePageFunction } from "./SuperAdminHomePageContext";

const findUserInfo = async (users: User[], userID: User["id"]) => {
  let findKeyValue = find(users, { id: userID }) && find(users, { id: userID });
  return findKeyValue ?? ((await getUserData(userID)) as User);
};

const filterAfterChanges = (
  prev: UserAndUnapprovedTimeEntriesType[],
  timeEntryID: TimeEntry["id"],
) =>
  prev
    .map((user) => ({
      ...user,
      unapprovedTimeEntries: reject(user.unapprovedTimeEntries, {
        id: timeEntryID,
      }) as TimeEntry[],
    }))
    .filter((user) => user.unapprovedTimeEntries.length > 0);

export const useSuperAdminHomePageContext = () => {
  const context = useSuperAdminFunction();
  const contextSAHP = useSuperAdminHomePageFunction();
  const allUsersInSystem = context?.allUsersInSystem ?? [];

  const onApproveTimeEntries = (
    timeEntries: Array<TimeEntry["id"]>,
    approvedBy: User["id"],
  ) => {
    timeEntries.map(
      async (timeEntryID) =>
        await confirmTimeEntry(timeEntryID, approvedBy).then(() => {
          contextSAHP?.setAllUsersWithUnconfirmedTimeEntries([
            ...filterAfterChanges(
              contextSAHP.allUsersWithUnconfirmedTimeEntries,
              timeEntryID,
            ),
          ]);
        }),
    );
  };

  const usersWithUnconfirmedTimeEntries = async (
    timeEntries: TimeEntry[],
  ): Promise<UserAndUnapprovedTimeEntriesType[]> => {
    let tempArr: UserAndUnapprovedTimeEntriesType[] = [];

    for (const item of timeEntries) {
      const userEntry: TimeEntry[] = timeEntries.filter(
        (entry) => entry.userID === item.userID,
      );

      const isAlreadyAdded = tempArr.some(
        (u) => u.unapprovedTimeEntries[0].userID === item.userID,
      );

      if (!isAlreadyAdded) {
        const adminInfo = await findUserInfo(allUsersInSystem, item.adminID);
        const userInfo = await findUserInfo(allUsersInSystem, item.userID);

        const obj: UserAndUnapprovedTimeEntriesType = {
          unapprovedTimeEntries: userEntry,
          adminFirstName: adminInfo.firstName,
          adminLastName: adminInfo.lastName,
          userFirstName: userInfo.firstName,
          userLastName: userInfo.lastName,
        };

        tempArr.push(obj);
      }
    }

    return tempArr;
  };

  return { onApproveTimeEntries, usersWithUnconfirmedTimeEntries };
};
