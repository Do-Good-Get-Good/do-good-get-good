import functions from "@react-native-firebase/functions";
import { useSuperAdminFunction } from "../../context/SuperAdminContext";
import { getProject } from "../../lib/project";
import { User } from "../../utility/types";
import { superAdminMakeUserObject } from "./utils";

export const useOnSelectUser = () => {
  const context = useSuperAdminFunction();
  const allAdminsAndSuperAdmin = context?.allAdminsAndSuperAdmins;
  const allUsersInTheSystem = context?.allUsersInSystem;

  const getUserEmail = async (userID: User["id"]) => {
    try {
      const userEmail = functions().httpsCallableFromUrl(
        `https://europe-north1-${getProject()}.cloudfunctions.net/adminGetUserEmailSecondGen`
      );

      const res = await userEmail({ userID: userID });
      return res.data;
    } catch (error) {
      console.log(error, "-----");
      return undefined;
    }
  };

  const onSelectUser = async (selectedUser: User) => {
    allUsersInTheSystem &&
      context.setMakeChangesForSelectedUser(
        superAdminMakeUserObject(
          selectedUser,
          allUsersInTheSystem,
          allAdminsAndSuperAdmin
        )
      );
    getUserEmail(selectedUser.id);
  };

  return { onSelectUser, getUserEmail };
};
