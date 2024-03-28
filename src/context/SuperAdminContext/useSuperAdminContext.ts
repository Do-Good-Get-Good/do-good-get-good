import { User } from "../../utility/types";

import { updateUserArray } from "../../hooks/superAdmin/utils";
import { Role } from "../../utility/enums";
import { useSuperAdminFunction } from "./SuperAdminContext";
import { UserInfo } from "../../screens/RolesAndConnection";
import { superAdminUpdatesUserInfo } from "../../firebase-functions/updateTS/superAdminUpdatesUserInfo";
import { UserName } from "../../screens/ChangeUser/updateUser";

import { AlertInfo } from "../../components/Alerts/AlertInfo";

const isSavingUpdatesSucceed = (succed: boolean) =>
  succed ? "Dina ändringar har sparats" : "Något gick fel";

export const useSuperAdminContext = () => {
  const context = useSuperAdminFunction();

  const makeChangesForSelectedUser = context?.makeChangesForSelectedUser;
  const allUsersInSystem = context?.allUsersInSystem ?? [];

  const updateUser = async (changedUser: User) => {
    const result = await superAdminUpdatesUserInfo(changedUser);
    result.success && updateUserAfterChanges(changedUser),
      AlertInfo(isSavingUpdatesSucceed(result.success));
  };

  const onSaveChangedUser = (
    changes: UserInfo,
    connectedUsersChangedAdmin?: User[],
  ) => {
    if (makeChangesForSelectedUser?.user && changes?.role) {
      const changedData = {
        ...makeChangesForSelectedUser.user,
        id: makeChangesForSelectedUser.user.id,
        firstName: makeChangesForSelectedUser.user.firstName,
        lastName: makeChangesForSelectedUser.user.lastName,
        statusActive: changes.isActive,
        role: changes?.role,
        adminID: changes.admin.id,
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
        updateUserArray(allUsersInSystem, changedUser) ?? [],
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
  };
};
