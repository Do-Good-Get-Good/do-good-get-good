import reject from "lodash/reject";

import { User } from "../../utilily/types";

import { updateUserArray } from "../../hooks/super-admin/utils";
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

  const updateUserAfterChanges = (changedUser: User) => {
    if (makeChangesForSelectedUser?.user.id === changedUser.id) {
      context?.setMakeChangesForSelectedUser({
        ...makeChangesForSelectedUser,
        user: changedUser,
      });
    }

    allUsersInSystem &&
      context?.setAllUsersInSystem(
        updateUserArray(allUsersInSystem, changedUser),
      );
  };

  const findAdminsAndSuperAdmins = (userArray: Array<User>) =>
    userArray.filter(
      (user) => user.role === Role.admin || user.role === Role.superadmin,
    );

  return {
    updateUserAfterChanges,
    findAdminsAndSuperAdmins,
    onSaveChangedUser,
    updateUser,
    updateUserName,
  };
};
