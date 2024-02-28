import { getUserData } from "../../firebase-functions/getTS/get";
import {
  TimeEntry,
  User,
  UserAndUnapprovedTimeEntriesType,
} from "../../utility/types";
import { useSuperAdminFunction } from "../SuperAdminContext";

import reject from "lodash/reject";
import { useSuperAdminHomePageFunction } from "./SuperAdminHomePageContext";
import { useApproveTimeEntry } from "../../hooks/useApproveTimeEntry/useApproveTimeEntry";

const findUserInfo = async (users: User[], userID: User["id"]) => {
  let findKeyValue = users.find((user) => user.id === userID);
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
  const { onApproveTimeEntries } = useApproveTimeEntry();
  const context = useSuperAdminFunction();
  const allUsersInSystem = context?.allUsersInSystem ?? [];
  const {
    allUsersWithUnconfirmedTimeEntries,
    setAllUsersWithUnconfirmedTimeEntries,
  } = useSuperAdminHomePageFunction();

  const onApproveTimeEntriesSuperadmin = async (
    timeEntries: Array<TimeEntry>,
    approvedBy: User["id"],
  ) => {
    let temArr = allUsersWithUnconfirmedTimeEntries ?? [];
    const afterApprove = await onApproveTimeEntries(timeEntries, approvedBy);
    console.log(afterApprove, " . -----   afterApprove");
    afterApprove.forEach((timeEntry) => {
      temArr = [...filterAfterChanges(temArr, timeEntry.id)];
      setAllUsersWithUnconfirmedTimeEntries(temArr);
    });
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
        const userInfo = await findUserInfo(allUsersInSystem, item.userID);

        const adminInfo = await findUserInfo(
          allUsersInSystem,
          userInfo.adminID ?? "",
        );

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

  return { onApproveTimeEntriesSuperadmin, usersWithUnconfirmedTimeEntries };
};
