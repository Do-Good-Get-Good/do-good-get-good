import { reject, set } from "lodash";
import { User } from "../../utilily/types";

import { updateUserArray } from "../../hooks/superAdmin/utils";
import { useEffect } from "react";
import { Role } from "../../utilily/enums";
import { useSuperAdminFunction } from "./SuperAdminContext";
import { UserInfo } from "../../screens/RolesAndConnection";
import { superAdminUpdatesUserInfo } from "../../firebase-functions/updateTS/superAdminUpdatesUserInfo";
import { UserName } from "../../screens/ChangeUser/updateUser";

export const useSuperAdminContext = () => {
  const context = useSuperAdminFunction();

  const makeChangesForSelectedUser = context?.makeChangesForSelectedUser;
  const allUsersInSystem = context?.allUsersInSystem;

  const updateUserName = (changeOnlyName: UserName) => {
    if (makeChangesForSelectedUser?.user) {
      let tempUser: User = {
        ...makeChangesForSelectedUser?.user,
        firstName: changeOnlyName?.name,
        lastName: changeOnlyName?.surname,
      };

      superAdminUpdatesUserInfo(tempUser).then(() =>
        updateUserAfterChanges(tempUser),
      );
    }
  };

  const updateUser = (changedUser: User) => {
    superAdminUpdatesUserInfo(changedUser).then(() =>
      updateUserAfterChanges(changedUser),
    );
  };

  const onSaveChangedUser = (
    data: UserInfo,
    connectedUsersChangedAdmin?: User[],
  ) => {
    if (makeChangesForSelectedUser?.user && data?.role) {
      const changedData = {
        id: makeChangesForSelectedUser.user.id,
        firstName: makeChangesForSelectedUser.user.firstName,
        lastName: makeChangesForSelectedUser.user.lastName,
        statusActive: data.isActive,
        role: data?.role,
        adminID: data.admin.id,
      };

      updateUser(changedData);
      connectedUsersChangedAdmin &&
        connectedUsersChangedAdmin.map((item) => updateUser(item));
    }
  };

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

  return {
    updateUserAfterChanges,
    findAdminsAndSuperAdmins,
    onSaveChangedUser,
    updateUser,
    updateUserName,
  };
};
