import React, { useContext, useEffect, useState } from "react";

import {
  User,
  UserAndUnapprovedTimeEntriesType,
  UserObjectForSuperAdmin,
} from "../../utility/types";

type AdminContextType = {
  usersConnectedToAdmin: User[];
  usersWithUnconfirmedTimeEntries: UserAndUnapprovedTimeEntriesType[];
  setUsersWithUnconfirmedTimeEntries: (
    user: UserAndUnapprovedTimeEntriesType[],
  ) => void;
  setUsersConnectedToAdmin: (users: User[]) => void;
};

const AdminContext = React.createContext<AdminContextType>({
  usersConnectedToAdmin: [],
  usersWithUnconfirmedTimeEntries: [],
  setUsersWithUnconfirmedTimeEntries: () => [],
  setUsersConnectedToAdmin: () => [],
});

export const useAdminFunction = () => {
  return useContext(AdminContext);
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [usersConnectedToAdmin, setUsersConnectedToAdmin] = useState<User[]>(
    [],
  );
  const [usersWithUnconfirmedTimeEntries, setUsersWithUnconfirmedTimeEntries] =
    useState<UserAndUnapprovedTimeEntriesType[]>([]);

  return (
    <AdminContext.Provider
      value={{
        usersConnectedToAdmin,
        usersWithUnconfirmedTimeEntries,
        setUsersWithUnconfirmedTimeEntries,
        setUsersConnectedToAdmin,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
