import { filter, find } from "lodash";
import { User, UserObjectForSuperAdmin } from "../../utilily/types";
import { Role } from "../../utilily/enums";

export const showAdminName = (
  connectedAdmin: User["adminID"],
  allAdminsAnsSuperAdmin: User[] | undefined,
) => {
  const admin = find(allAdminsAnsSuperAdmin, { id: connectedAdmin });
  return admin?.firstName + " " + admin?.lastName;
};

export const findAllUsersConnectedToTheAdmin = (
  adminID: User["id"],
  arrayOfAllUsersInSystem: User[] | undefined,
): User[] => filter(arrayOfAllUsersInSystem, { adminID: adminID });

export const superAdminMakeUserObject = (
  selectedUser: User,
  allUsersInTheSystem: User[],
  allAdminsAnsSuperAdmin: User[] | undefined,
): UserObjectForSuperAdmin => {
  const hasUsers =
    selectedUser.role === Role.admin || selectedUser.role === Role.superadmin;

  return {
    adminName: showAdminName(selectedUser.adminID, allAdminsAnsSuperAdmin),
    arrayOfUsersIfAdmin: hasUsers
      ? findAllUsersConnectedToTheAdmin(selectedUser.id, allUsersInTheSystem)
      : undefined,
    user: selectedUser,
  };
};
