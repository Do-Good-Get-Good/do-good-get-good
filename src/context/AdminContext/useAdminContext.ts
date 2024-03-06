import auth from "@react-native-firebase/auth";
import { useAdminFunction } from ".";

import {
  getAllUsersConnectedToAdmin,
  getUserUnconfirmedTimeEntries,
} from "../../firebase-functions/getTS/get";
import {
  TimeEntry,
  User,
  UserAndUnapprovedTimeEntriesType,
} from "../../utility/types";
import {
  filterAfterApprovedTimeEntrirs,
  makeListOfUserAndUnapprovedTimeEntries,
} from "../utility/functions";
import { useApproveTimeEntry } from "../../hooks/useApproveTimeEntry/useApproveTimeEntry";

const getTimeEntriesAndUsers = async (
  adminUsers: User[],
): Promise<UserAndUnapprovedTimeEntriesType[]> => {
  let unapprovedTimeEntries: TimeEntry[] = [];

  for (const adminUser of adminUsers) {
    const tempArr = await getUserUnconfirmedTimeEntries(adminUser.id);
    tempArr && unapprovedTimeEntries.push(...tempArr);
  }

  const usersAndUnconfirmedTimeEntries =
    await makeListOfUserAndUnapprovedTimeEntries(
      unapprovedTimeEntries,
      adminUsers,
    );
  return usersAndUnconfirmedTimeEntries;
};

export const useAdminContext = () => {
  const { onApproveTimeEntries } = useApproveTimeEntry();

  const {
    usersWithUnconfirmedTimeEntries,
    setUsersConnectedToAdmin,
    setUsersWithUnconfirmedTimeEntries,
  } = useAdminFunction();
  const adminID = auth().currentUser?.uid;

  const onApproveTimeEntriesAdmin = async (timeEntries: Array<TimeEntry>) => {
    if (adminID) {
      let temArr = usersWithUnconfirmedTimeEntries ?? [];
      const afterApprove = await onApproveTimeEntries(timeEntries, adminID);
      afterApprove.forEach((timeEntry) => {
        temArr = [...filterAfterApprovedTimeEntrirs(temArr, timeEntry.id)];
        setUsersWithUnconfirmedTimeEntries(temArr);
      });
    }
  };

  const onShowUnApprovedTimeEntriesAdminPage = async () => {
    if (!adminID) return null;

    const adminUsers = await getAllUsersConnectedToAdmin(adminID);

    const usersAndUnapprovedTimeEntries =
      await getTimeEntriesAndUsers(adminUsers);

    setUsersConnectedToAdmin(adminUsers);
    setUsersWithUnconfirmedTimeEntries(usersAndUnapprovedTimeEntries);
  };

  return { onShowUnApprovedTimeEntriesAdminPage, onApproveTimeEntriesAdmin };
};
