import { getUserData } from "../../firebase-functions/getTS/get";
import {
  TimeEntry,
  User,
  UserAndUnapprovedTimeEntriesType,
} from "../../utilily/types";
import { useSuperAdminFunction } from "../SuperAdminContext";
import { find } from "lodash";

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

    for (const item of timeEntries) {
      const userEntry: TimeEntry[] = timeEntries.filter(
        (entry) => entry.userID === item.userID,
      );

      const isAlreadyAdded = tempArr.some(
        (u) => u.unapprovedTimeEntries[0].userID === item.userID,
      );

      if (!isAlreadyAdded) {
        const userInfo = await findUserInfo(allUsersInSystem, item.userID);

        //                  OPEN DISCUSSION!
        //  I don’t use adminID that comes with time entry document. I use adminID from user object to see who is currently responsible for the user. If you agree with this then we should change it at AdminPage too. I think that if an admin has changed then this new admin should take responsibility for user unapproved time entries too, even if they have been created while previous admin. Or what do you think?

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

  return { usersWithUnconfirmedTimeEntries };
};
