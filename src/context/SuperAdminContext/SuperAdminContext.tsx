import React, { useContext, useEffect, useState } from "react";

import { User, UserObjectForSuperAdmin } from "../../utilily/types";
import { useSuperAdminContext } from "./useSuperAdminContext";

type SuperAdminContextType = {
  allUsersInSystem: User[] | undefined;
  setAllUsersInSystem: (users: User[] | undefined) => void;

  setMakeChangesForSelectedUser: (
    value: UserObjectForSuperAdmin | undefined,
  ) => void;

  allAdminsAnsSuperAdmins: User[] | undefined;

  makeChangesForSelectedUser: UserObjectForSuperAdmin | undefined;
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
  const { findAdminsAndSuperAdmins } = useSuperAdminContext();
  const [allUsersInSystem, setAllUsersInSystem] = useState<User[] | undefined>(
    [],
  );

  const [allAdminsAnsSuperAdmins, setAllAdminsAnsSuperAdmins] = useState<
    User[] | undefined
  >(undefined);
  const [makeChangesForSelectedUser, setMakeChangesForSelectedUser] = useState<
    UserObjectForSuperAdmin | undefined
  >(undefined);

  useEffect(() => {
    allUsersInSystem &&
      setAllAdminsAnsSuperAdmins(findAdminsAndSuperAdmins(allUsersInSystem));
  }, [allUsersInSystem]);

  return (
    <SuperAdminContext.Provider
      value={{
        allUsersInSystem,
        setAllUsersInSystem,

        allAdminsAnsSuperAdmins,

        makeChangesForSelectedUser,
        setMakeChangesForSelectedUser,
      }}
    >
      {children}
    </SuperAdminContext.Provider>
  );
};
