import { useSuperAdminFunction } from "../../context/SuperAdminContext";
import { User } from "../../utilily/types";
import { superAdminMakeUserObject } from "./utils";

export const useOnSelectUser = () => {
  const context = useSuperAdminFunction();
  const allAdminsAnsSuperAdmin = context?.allAdminsAndSuperAdmins;
  const allUsersInTheSystem = context?.allUsersInSystem;

  const onSelectUser = (selectedUser: User) => {
    allUsersInTheSystem &&
      context.setMakeChangesForSelectedUser(
        superAdminMakeUserObject(
          selectedUser,
          allUsersInTheSystem,
          allAdminsAnsSuperAdmin,
        ),
      );
  };

  return { onSelectUser };
};
