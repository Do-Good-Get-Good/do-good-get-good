import { reject, set } from "lodash";
import { User } from "../../utilily/types";

import { updateUserArray } from "../../hooks/super-admin/utils";
import { useEffect } from "react";
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
      context?.setMakeChangesForSelectedUser(
        set(
          makeChangesForSelectedUser,
          "arrayOfUsersIfAdmin",
          isAdminChanged
            ? [...reject(connectedUsers, { id: changedUser.id })]
            : updateUserArray(connectedUsers, changedUser),
        ),
      );
  };

  const updateUserAfterChanges = (changedUser: User) => {
    if (makeChangesForSelectedUser?.user.id === changedUser.id) {
      context?.setMakeChangesForSelectedUser(
        set(makeChangesForSelectedUser, "user", changedUser),
      );
    }
    updateUserInfoInArrayOfUsersIfAdmin(changedUser);

    allUsersInSystem &&
      context?.setAllUsersInSystem(
        updateUserArray(allUsersInSystem, changedUser),
      );
  };

  const findAdminsAndSuperAdmins = (userArray: Array<User>) => {
    let adminArray: Array<User> = [];
    for (let i = 0; i < userArray.length; i++) {
      if (
        userArray[i].role === Role.admin ||
        userArray[i].role === Role.superadmin
      ) {
        adminArray.push(userArray[i]);
      }
    }
    return adminArray;
  };

  return { updateUserAfterChanges, findAdminsAndSuperAdmins };
};
