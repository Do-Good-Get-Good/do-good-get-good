import { getUserData } from "../../firebase-functions/getTS/get";
import {
  TimeEntry,
  User,
  UserAndUnapprovedTimeEntriesType,
} from "../../utilily/types";
import { useSuperAdminFunction } from "../SuperAdminContext";
import { find, remove } from "lodash";

const findUserInfo = async (users: User[], userID: User["id"]) => {
  let findKeyValue = find(users, { id: userID }) && find(users, { id: userID });
  return findKeyValue ?? ((await getUserData(userID)) as User);
};

export const useSuperAdminHomePageContext = () => {
  const context = useSuperAdminFunction();
  const allUsersInSystem = context?.allUsersInSystem ?? [];

  const usersWithUnconfirmedTimeEntries = async (
    timeEntries: TimeEntry[],
  ): Promise<UserAndUnapprovedTimeEntriesType[]> => {
    let tempArr: UserAndUnapprovedTimeEntriesType[] = [];

    await Promise.all(
      timeEntries.map(async (item) => {
        const userEntry = find(timeEntries, { userID: item.userID });
        const isAlreadyAdded = find(tempArr, { userID: item.userID });

        if (userEntry && !isAlreadyAdded) {
          const adminInfo = await findUserInfo(allUsersInSystem, item.adminID);
          const userInfo = await findUserInfo(allUsersInSystem, item.userID);

          const obj: UserAndUnapprovedTimeEntriesType = {
            unapprovedTimeEntries: [userEntry],
            adminFirstName: adminInfo.firstName,
            adminLastName: adminInfo.lastName,
            userFirstName: userInfo.firstName,
            userLastName: userInfo.lastName,
          };

          tempArr.push(obj);
        }
      }),
    );
    return tempArr;
  };

  return { usersWithUnconfirmedTimeEntries };
};
