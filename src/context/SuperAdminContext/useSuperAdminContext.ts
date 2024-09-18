import { useState } from "react";
import { AlertInfo } from "../../components/Alerts/AlertInfo";
import { superAdminUpdatesUserInfo } from "../../firebase-functions/updateTS/superAdminUpdatesUserInfo";
import { updateUserArray } from "../../hooks/superAdmin/utils";
import { UserInfo } from "../../screens/RolesAndConnection";
import { Role } from "../../utility/enums";
import { User } from "../../utility/types";
import { useSuperAdminFunction } from "./SuperAdminContext";

const isSavingUpdatesSucceed = (succed: boolean) =>
  succed ? "Dina ändringar har sparats" : "Något gick fel";

export const useSuperAdminContext = () => {
  const context = useSuperAdminFunction();
  const [loading, setLoading] = useState(false);

  const makeChangesForSelectedUser = context?.makeChangesForSelectedUser;
  const allUsersInSystem = context?.allUsersInSystem ?? [];

  const updateUser = async (changedUser: User) => {
    setLoading(true);
    const result = await superAdminUpdatesUserInfo(changedUser);
    result.success && updateUserAfterChanges(changedUser),
      AlertInfo(isSavingUpdatesSucceed(result.success));
    setLoading(false);
  };

  const onSaveChangedUser = (
    changes: UserInfo,
    connectedUsersChangedAdmin?: User[]
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
        updateUserArray(allUsersInSystem, changedUser) ?? []
      );
  };

  const findAdminsAndSuperAdmins = (userArray: Array<User>) =>
    userArray.filter(
      (user) => user.role === Role.admin || user.role === Role.superadmin
    );

  return {
    updateUserAfterChanges,
    findAdminsAndSuperAdmins,
    onSaveChangedUser,
    updateUser,
    loading,
  };
};
