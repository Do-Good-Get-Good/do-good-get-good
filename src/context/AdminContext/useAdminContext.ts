import auth from "@react-native-firebase/auth";
import { useAdminFunction } from ".";
import {
  getAllUsersConnectedToAdmin,
  getUserUnconfirmedTimeEntries,
  getUsersFiveNewestTimeEntries,
} from "../../firebase-functions/getTS/get";
import { useApproveTimeEntry } from "../../hooks/useApproveTimeEntry/useApproveTimeEntry";
import { Role } from "../../utility/enums";
import { TimeEntry, User } from "../../utility/types";
import { useUserLevel } from "../useUserLevel";
import { makeArrayWithTimeEntriesAndUsers } from "./utility";

export const useAdminContext = () => {
  const { onApproveTimeEntries } = useApproveTimeEntry();
  const { userLevel } = useUserLevel();

  const {
    setUsersWithFiveConfirmedTimeEntries,
    setUsersWithUnconfirmedTimeEntries,
    setAllUsersConnectedToadmin,
    setLoading,
  } = useAdminFunction();
  const adminID = auth().currentUser?.uid;
  const isGranted =
    adminID && (userLevel === Role.superadmin || userLevel === Role.admin);

  const onApproveTimeEntriesAdmin = async (
    timeEntries: Array<TimeEntry>
  ): Promise<void> => {
    if (adminID) {
      await onApproveTimeEntries(timeEntries, adminID).then(() =>
        onShowUnApprovedTimeEntriesAdminPage()
      );
    }
  };

  const usersAndUnapprovedTimeEntries = async (adminUsers: User[]) => {
    const allTimeEntriesAndUsers = await makeArrayWithTimeEntriesAndUsers(
      adminUsers,
      getUserUnconfirmedTimeEntries,
      true
    );
    setUsersWithUnconfirmedTimeEntries(allTimeEntriesAndUsers);
  };

  const usersAndFiveApprovedTimeEntries = async (adminUsers: User[]) => {
    setLoading(true);
    const fiveTimeEntriesAndUsers = await makeArrayWithTimeEntriesAndUsers(
      adminUsers,
      getUsersFiveNewestTimeEntries
    );
    setUsersWithFiveConfirmedTimeEntries(fiveTimeEntriesAndUsers);
    setLoading(false);
  };

  const getAdminUsers = async () => {
    const adminUsers = isGranted
      ? await getAllUsersConnectedToAdmin(adminID)
      : [];
    setAllUsersConnectedToadmin(adminUsers);
    return adminUsers;
  };

  const onShowUnApprovedTimeEntriesAdminPage = async () => {
    if (isGranted) {
      setLoading(true);
      const adminUsers = await getAdminUsers();
      usersAndUnapprovedTimeEntries(adminUsers);
      await usersAndFiveApprovedTimeEntries(adminUsers);
      setLoading(false);
    }
  };

  return {
    onShowUnApprovedTimeEntriesAdminPage,
    onApproveTimeEntriesAdmin,
    getAdminUsers,
  };
};
