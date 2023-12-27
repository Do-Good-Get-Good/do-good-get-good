import { useEffect, useState } from "react";
import { Role } from "../../../utilily/enums";
import { UserObjectForSuperAdmin } from "../../../utilily/types";
import { superAdminMakeUserObject } from "../../../utilily/utils";

export const useChangeRoleOfTheSelectedUse = (
  selectedUser: UserObjectForSuperAdmin,
  newRole: Role,
) => {
  const [selectedUserHasRole, setSelectedUserHasRole] =
    useState<UserObjectForSuperAdmin>();

  const changeRoleOfTheSelectedUser = ():
    | UserObjectForSuperAdmin
    | undefined => {
    if (
      newRole === Role.user &&
      selectedUserHasRole?.arrayOfUsersIfAdmin.length !== 0
    ) {
      return undefined;
    } else {
      let tempObject = superAdminMakeUserObject(selectedUser, newRole);
      setSelectedUserHasRole(tempObject);
    }
  };

  useEffect(() => {
    changeRoleOfTheSelectedUser();
  }, [newRole]);

  return { selectedUserHasRole };
};
