import React, { useContext, useState, useEffect } from "react";
import { superAdminUpdatesUserInfo } from "../firebase-functions/updateTS/superAdminUpdatesUserInfo";

import { User, UserObjectForSuperAdmin } from "../utilily/types";

import { reject, set } from "lodash";
import { Role } from "../utilily/enums";
import { updateUserArray } from "../hooks/super-admin/utils";

type SuperAdminContextType = {
  allUsersInSystem: User[] | undefined;
  setAllUsersInSystem: (users: User[] | undefined) => void;

  setMakeChangesForSelectedUser: (
    value: UserObjectForSuperAdmin | undefined,
  ) => void;

  allAdminsAnsSuperAdmins: User[] | undefined;

  makeChangesForSelectedUser: UserObjectForSuperAdmin | undefined;
  updateUserAfterChanges: (value: User) => void;
};

const SuperAdminContext = React.createContext<
  SuperAdminContextType | undefined
>(undefined);

export const useSuperAdminFunction = () => {
  return useContext(SuperAdminContext);
};

export const SuperAdminProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [allUsersInSystem, setAllUsersInSystem] = useState<User[] | undefined>(
    [],
  );

  const [allAdminsAnsSuperAdmins, setAllAdminsAnsSuperAdmins] = useState<
    User[] | undefined
  >(undefined);
  const [makeChangesForSelectedUser, setMakeChangesForSelectedUser] = useState<
    UserObjectForSuperAdmin | undefined
  >(undefined);

  const updateUserInfoInArrayOfUsersIfAdmin = (changedUser: User) => {
    const connectedUsers = makeChangesForSelectedUser?.arrayOfUsersIfAdmin;
    const isAdminChanged =
      changedUser.adminID !== makeChangesForSelectedUser?.user.id;

    makeChangesForSelectedUser?.arrayOfUsersIfAdmin &&
      setMakeChangesForSelectedUser(
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
      setMakeChangesForSelectedUser(
        set(makeChangesForSelectedUser, "user", changedUser),
      );
    }
    updateUserInfoInArrayOfUsersIfAdmin(changedUser);

    allUsersInSystem &&
      setAllUsersInSystem(updateUserArray(allUsersInSystem, changedUser));
  };

  useEffect(() => {
    allUsersInSystem && findAdminsAndSuperAdmins(allUsersInSystem);
  }, [allUsersInSystem]);

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

    setAllAdminsAnsSuperAdmins(adminArray);
  };

  return (
    <SuperAdminContext.Provider
      value={{
        allUsersInSystem: allUsersInSystem,
        setAllUsersInSystem: setAllUsersInSystem,

        allAdminsAnsSuperAdmins: allAdminsAnsSuperAdmins,

        makeChangesForSelectedUser: makeChangesForSelectedUser,
        setMakeChangesForSelectedUser: setMakeChangesForSelectedUser,

        updateUserAfterChanges: updateUserAfterChanges,
      }}
    >
      {children}
    </SuperAdminContext.Provider>
  );
};
