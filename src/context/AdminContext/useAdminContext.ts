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
import { makeListOfUserAndUnapprovedTimeEntries } from "../utility/functions";

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
  const { setUsersConnectedToAdmin, setUsersWithUnconfirmedTimeEntries } =
    useAdminFunction();
  const adminID = auth().currentUser?.uid;

  const onShowAdminPage = async () => {
    if (!adminID) return null;

    const adminUsers = await getAllUsersConnectedToAdmin(adminID);

    const usersAndUnapprovedTimeEntries =
      await getTimeEntriesAndUsers(adminUsers);

    setUsersConnectedToAdmin(adminUsers);
    setUsersWithUnconfirmedTimeEntries(usersAndUnapprovedTimeEntries);
  };

  return { onShowAdminPage };
};
