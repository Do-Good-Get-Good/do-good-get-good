import { filter, find, findIndex } from "lodash";
import { User, UserObjectForSuperAdmin } from "../../utilily/types";
import { Role } from "../../utilily/enums";

export const showAdminName = (
  connectedAdmin: User["adminID"],
  allAdminsAndSuperAdmin: User[] | undefined,
) => {
  const admin = find(allAdminsAndSuperAdmin, { id: connectedAdmin });
  return admin?.firstName + " " + admin?.lastName;
};

export const findAllUsersConnectedToTheAdmin = (
  adminID: User["id"],
  arrayOfAllUsersInSystem: User[] | undefined,
): User[] => filter(arrayOfAllUsersInSystem, { adminID: adminID });

export const updateUserArray = (
  arrayToUpdate: Array<User> | undefined,
  changedUser: User,
) => {
  const index = findIndex(arrayToUpdate, ["id", changedUser.id]);
  if (index !== -1 && arrayToUpdate) {
    const newArray = [...arrayToUpdate];
    newArray.splice(index, 1, changedUser);
    return newArray;
  } else arrayToUpdate;
};

export const superAdminMakeUserObject = (
  selectedUser: User,
  allUsersInTheSystem: User[],
  allAdminsAndSuperAdmin: User[] | undefined,
): UserObjectForSuperAdmin => {
  const hasUsers =
    selectedUser.role === Role.admin || selectedUser.role === Role.superadmin;

  return {
    adminName: showAdminName(selectedUser.adminID, allAdminsAndSuperAdmin),
    arrayOfUsersIfAdmin: hasUsers
      ? findAllUsersConnectedToTheAdmin(selectedUser.id, allUsersInTheSystem)
      : undefined,
    user: selectedUser,
  };
};
