import React, { useContext, useEffect, useState } from "react";

import { User, UserObjectForSuperAdmin } from "../../utility/types";
import { useSuperAdminContext } from "./useSuperAdminContext";

type SuperAdminContextType = {
  allUsersInSystem: User[] | undefined;
  setAllUsersInSystem: (users: User[] ) => void;
  setMakeChangesForSelectedUser: (
    value: UserObjectForSuperAdmin ,
  ) => void;
  allAdminsAndSuperAdmins: User[] ;
  makeChangesForSelectedUser: UserObjectForSuperAdmin  | null;
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
  const [allUsersInSystem, setAllUsersInSystem] = useState<User[]>(
    [],
  );

  const [allAdminsAndSuperAdmins, setAllAdminsAndSuperAdmins] = useState<
    User[] 
  >([]);
  const [makeChangesForSelectedUser, setMakeChangesForSelectedUser] = useState<
    UserObjectForSuperAdmin | null
  >(null);

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
