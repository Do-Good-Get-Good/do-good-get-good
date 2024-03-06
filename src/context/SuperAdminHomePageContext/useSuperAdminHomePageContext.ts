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
import { makeListOfUserAndUnapprovedTimeEntries } from "../utility/functions";

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
    afterApprove.forEach((timeEntry) => {
      temArr = [...filterAfterChanges(temArr, timeEntry.id)];
      setAllUsersWithUnconfirmedTimeEntries(temArr);
    });
  };

  const usersWithUnconfirmedTimeEntries = async (timeEntries: TimeEntry[]) =>
    await makeListOfUserAndUnapprovedTimeEntries(timeEntries, allUsersInSystem);

  return { onApproveTimeEntriesSuperadmin, usersWithUnconfirmedTimeEntries };
};
