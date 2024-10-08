import { getAllUnconfirmedTimeEntries } from "../../firebase-functions/getTS/get";
import { useApproveTimeEntry } from "../../hooks/useApproveTimeEntry/useApproveTimeEntry";
import { TimeEntry, User } from "../../utility/types";
import { useSuperAdminFunction } from "../SuperAdminContext";
import {
  filterAfterApprovedTimeEntrirs,
  makeListOfUserAndUnapprovedTimeEntries,
} from "../utility/functions";
import { useSuperAdminHomePageFunction } from "./SuperAdminHomePageContext";

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
    approvedBy: User["id"]
  ) => {
    let temArr = allUsersWithUnconfirmedTimeEntries ?? [];
    const afterApprove = await onApproveTimeEntries(timeEntries, approvedBy);
    afterApprove.forEach((timeEntry) => {
      temArr = [...filterAfterApprovedTimeEntrirs(temArr, timeEntry.id)];
      setAllUsersWithUnconfirmedTimeEntries(temArr);
    });
  };

  const getAllUserAndUnapprovedTimeEntries = async () => {
    const unconfirmedTimeEntries = await getAllUnconfirmedTimeEntries();

    let usersAndUnconfirmedTimeEntries = await usersWithUnconfirmedTimeEntries(
      unconfirmedTimeEntries
    );
    usersAndUnconfirmedTimeEntries &&
      setAllUsersWithUnconfirmedTimeEntries(usersAndUnconfirmedTimeEntries);
  };

  const usersWithUnconfirmedTimeEntries = async (timeEntries: TimeEntry[]) =>
    await makeListOfUserAndUnapprovedTimeEntries(timeEntries, allUsersInSystem);

  return {
    onApproveTimeEntriesSuperadmin,
    usersWithUnconfirmedTimeEntries,
    getAllUserAndUnapprovedTimeEntries,
  };
};
