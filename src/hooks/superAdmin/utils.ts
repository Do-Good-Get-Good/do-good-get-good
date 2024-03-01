import { User, UserObjectForSuperAdmin } from "../../utility/types";
import { Role } from "../../utility/enums";

export const showAdminName = (
  connectedAdmin: User["adminID"],
  allAdminsAndSuperAdmin: User[] | undefined,
) => {
  const admin = allAdminsAndSuperAdmin?.find(
    (item) => item.id === connectedAdmin,
  );
  return admin?.firstName + " " + admin?.lastName;
};

export const findAllUsersConnectedToTheAdmin = (
  adminID: User["id"],
  arrayOfAllUsersInSystem: User[] | undefined,
): User[] =>
  arrayOfAllUsersInSystem?.filter((user) => user?.adminID === adminID) ?? [];

export const updateUserArray = (
  arrayToUpdate: Array<User> | undefined,
  changedUser: User,
) => {
  const index =
    arrayToUpdate?.findIndex((item) => item.id === changedUser.id) ?? -1;

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
