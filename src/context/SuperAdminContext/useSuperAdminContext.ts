import reject from "lodash/reject";

import { User } from "../../utilily/types";

import { updateUserArray } from "../../hooks/super-admin/utils";
import { Role } from "../../utilily/enums";
import { useSuperAdminFunction } from "./SuperAdminContext";

export const useSuperAdminContext = () => {
  const context = useSuperAdminFunction();

  const makeChangesForSelectedUser = context?.makeChangesForSelectedUser;
  const allUsersInSystem = context?.allUsersInSystem;

  const updateUserInfoInArrayOfUsersIfAdmin = (changedUser: User) => {
    const connectedUsers = makeChangesForSelectedUser?.arrayOfUsersIfAdmin;
    const isAdminChanged =
      changedUser.adminID !== makeChangesForSelectedUser?.user.id;

    makeChangesForSelectedUser?.arrayOfUsersIfAdmin &&
      context?.setMakeChangesForSelectedUser({
        ...makeChangesForSelectedUser,
        arrayOfUsersIfAdmin: isAdminChanged
          ? [...reject(connectedUsers, { id: changedUser.id })]
          : updateUserArray(connectedUsers, changedUser),
      });
  };

  const updateUserAfterChanges = (changedUser: User) => {
    if (makeChangesForSelectedUser?.user.id === changedUser.id) {
      context?.setMakeChangesForSelectedUser({
        ...makeChangesForSelectedUser,
        user: changedUser,
      });
    }
    updateUserInfoInArrayOfUsersIfAdmin(changedUser);

    allUsersInSystem &&
      context?.setAllUsersInSystem(
        updateUserArray(allUsersInSystem, changedUser),
      );
  };

  const findAdminsAndSuperAdmins = (userArray: Array<User>) =>
    userArray.filter(
      (user) => user.role === Role.admin || user.role === Role.superadmin,
    );

  return { updateUserAfterChanges, findAdminsAndSuperAdmins };
};
