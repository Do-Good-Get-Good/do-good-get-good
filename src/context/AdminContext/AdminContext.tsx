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
  setUsersWithFiveUnconfirmedTimeEntries: (user: User[]) => void;
  loading: boolean;
  setLoading: (user: boolean) => void;
  allUsersConnectedToadmin: User[];
  setAllUsersConnectedToadmin: (users: User[]) => void;
};

const AdminContext = React.createContext<AdminContextType>({
  usersWithFiveUnconfirmedTimeEntries: [],
  usersWithUnconfirmedTimeEntries: [],
  setUsersWithUnconfirmedTimeEntries: () => [],
  setUsersWithFiveUnconfirmedTimeEntries: () => [],
  loading: true,
  setLoading: () => [],
  allUsersConnectedToadmin: [],
  setAllUsersConnectedToadmin: () => [],
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
  const [loading, setLoading] = useState(true);
  const [allUsersConnectedToadmin, setAllUsersConnectedToadmin] = useState<
    User[]
  >([]);

  return (
    <AdminContext.Provider
      value={{
        usersWithFiveUnconfirmedTimeEntries,
        usersWithUnconfirmedTimeEntries,
        setUsersWithUnconfirmedTimeEntries,
        setUsersWithFiveUnconfirmedTimeEntries,
        allUsersConnectedToadmin,
        setAllUsersConnectedToadmin,
        loading,
        setLoading,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
