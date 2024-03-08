import auth from "@react-native-firebase/auth";
import { useAdminFunction } from ".";

import {
  getAllUsersConnectedToAdmin,
  getUserUnconfirmedTimeEntries,
  getUsersFiveNewestTimeEntries,
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
import adminStore from "../../store/adminStore";
import { Role } from "../../utility/enums";
import userLevelStore from "../../store/userLevel";
import { useEffect, useState } from "react";

const makeArrayWithTimeEntriesAndUsers = async (
  usersConnectedToAdmin: User[],
  getTimeEntries: (id: User["id"]) => Promise<TimeEntry[]>,
) => {
  let prevUsers: User[] = [];

  for (const user of usersConnectedToAdmin) {
    const tempArr = await getTimeEntries(user.id);

    if (tempArr.length > 0) {
      prevUsers.push({
        ...user,
        timeEntries: tempArr,
      });
    }
  }
  return prevUsers;
};

export const useAdminContext = () => {
  const { onApproveTimeEntries } = useApproveTimeEntry();
  const { userLevel } = userLevelStore;

  const {
    setUsersWithFiveUnconfirmedTimeEntries,
    setUsersWithUnconfirmedTimeEntries,
    setLoading,
  } = useAdminFunction();
  const adminID = auth().currentUser?.uid;

  const onApproveTimeEntriesAdmin = async (timeEntries: Array<TimeEntry>) => {
    if (adminID) {
      await onApproveTimeEntries(timeEntries, adminID).then(() =>
        onShowUnApprovedTimeEntriesAdminPage(),
      );
    }
  };

  const onShowUnApprovedTimeEntriesAdminPage = async () => {
    if (
      adminID &&
      (userLevel === Role.superadmin || userLevel === Role.admin)
    ) {
      const adminUsers = await getAllUsersConnectedToAdmin(adminID);
      const allTimeEntriesAndUsers = await makeArrayWithTimeEntriesAndUsers(
        adminUsers,
        getUserUnconfirmedTimeEntries,
      );
      setUsersWithUnconfirmedTimeEntries(allTimeEntriesAndUsers);
      const fiveTimeEntriesAndUsers = await makeArrayWithTimeEntriesAndUsers(
        adminUsers,
        getUsersFiveNewestTimeEntries,
      );
      // for this PR I leave this logic with admin store to keep branch smaller but in next branch it will be away
      await adminStore.fetchAllUsers(adminUsers);

      setUsersWithFiveUnconfirmedTimeEntries(fiveTimeEntriesAndUsers);
      setLoading(false);
    }
  };

  return {
    onShowUnApprovedTimeEntriesAdminPage,
    onApproveTimeEntriesAdmin,
  };
};
