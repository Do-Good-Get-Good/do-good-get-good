import React, { useContext, useEffect, useState } from "react";

import {
  User,
  UserAndUnapprovedTimeEntriesType,
  UserObjectForSuperAdmin,
} from "../../utility/types";

type AdminContextType = {
  usersWithFiveUnconfirmedTimeEntries: User[];
  usersWithUnconfirmedTimeEntries: User[];
  setUsersWithUnconfirmedTimeEntries: (user: User[]) => void;
  setUsersWithFiveUnconfirmedTimeEntries: (users: User[]) => void;
};

const AdminContext = React.createContext<AdminContextType>({
  usersWithFiveUnconfirmedTimeEntries: [],
  usersWithUnconfirmedTimeEntries: [],
  setUsersWithUnconfirmedTimeEntries: () => [],
  setUsersWithFiveUnconfirmedTimeEntries: () => [],
});

export const useAdminFunction = () => {
  return useContext(AdminContext);
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [
    usersWithFiveUnconfirmedTimeEntries,
    setUsersWithFiveUnconfirmedTimeEntries,
  ] = useState<User[]>([]);
  const [usersWithUnconfirmedTimeEntries, setUsersWithUnconfirmedTimeEntries] =
    useState<User[]>([]);

  return (
    <AdminContext.Provider
      value={{
        usersWithFiveUnconfirmedTimeEntries,
        usersWithUnconfirmedTimeEntries,
        setUsersWithUnconfirmedTimeEntries,
        setUsersWithFiveUnconfirmedTimeEntries,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
