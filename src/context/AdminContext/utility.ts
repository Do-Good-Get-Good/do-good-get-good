import { TimeEntry, User } from "../../utility/types";

export const makeArrayWithTimeEntriesAndUsers = async (
  usersConnectedToAdmin: User[],
  getTimeEntries: (id: User["id"]) => Promise<TimeEntry[]>,
  onShowOnlyUsersWithTimeEnties: boolean = false
) => {
  let prevUsers: User[] = [];

  for (const user of usersConnectedToAdmin) {
    const tempArr = await getTimeEntries(user.id);

    if (!onShowOnlyUsersWithTimeEnties || tempArr.length > 0) {
      prevUsers.push({
        ...user,
        timeEntries: tempArr,
      });
    }
  }
  return prevUsers;
};
