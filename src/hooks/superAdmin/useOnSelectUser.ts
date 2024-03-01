import { useSuperAdminFunction } from "../../context/SuperAdminContext";
import { User } from "../../utility/types";
import { superAdminMakeUserObject } from "./utils";

export const useOnSelectUser = () => {
  const context = useSuperAdminFunction();
  const allAdminsAndSuperAdmin = context?.allAdminsAndSuperAdmins;
  const allUsersInTheSystem = context?.allUsersInSystem;

  const onSelectUser = (selectedUser: User) => {
    allUsersInTheSystem &&
      context.setMakeChangesForSelectedUser(
        superAdminMakeUserObject(
          selectedUser,
          allUsersInTheSystem,
          allAdminsAndSuperAdmin,
        ),
      );
  };

  return { onSelectUser };
};
