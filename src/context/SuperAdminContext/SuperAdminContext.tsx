import React, { useContext, useEffect, useState } from "react";

import { User, UserObjectForSuperAdmin } from "../../utilily/types";
import { useSuperAdminContext } from "./useSuperAdminContext";

type SuperAdminContextType = {
  allUsersInSystem: User[] | undefined;
  setAllUsersInSystem: (users: User[] | undefined) => void;
  setMakeChangesForSelectedUser: (
    value: UserObjectForSuperAdmin | undefined,
  ) => void;
  allAdminsAndSuperAdmins: User[] | undefined;
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

  const [allAdminsAndSuperAdmins, setAllAdminsAndSuperAdmins] = useState<
    User[] | undefined
  >(undefined);
  const [makeChangesForSelectedUser, setMakeChangesForSelectedUser] = useState<
    UserObjectForSuperAdmin | undefined
  >(undefined);

  useEffect(() => {
    allUsersInSystem &&
      setAllAdminsAndSuperAdmins(findAdminsAndSuperAdmins(allUsersInSystem));
  }, [allUsersInSystem]);

  return (
    <SuperAdminContext.Provider
      value={{
        allUsersInSystem,
        setAllUsersInSystem,

        allAdminsAndSuperAdmins,

        makeChangesForSelectedUser,
        setMakeChangesForSelectedUser,
      }}
    >
      {children}
    </SuperAdminContext.Provider>
  );
};
