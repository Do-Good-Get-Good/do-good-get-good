import React, { useContext, useEffect, useState } from "react";

import {
  User,
  UserAndUnapprovedTimeEntriesType,
  UserObjectForSuperAdmin,
} from "../../utility/types";

type AdminContextType = {
  usersWithFiveConfirmedTimeEntries: User[];
  usersWithUnconfirmedTimeEntries: User[];
  setUsersWithUnconfirmedTimeEntries: (user: User[]) => void;
  setUsersWithFiveConfirmedTimeEntries: (user: User[]) => void;
  loading: boolean;
  setLoading: (user: boolean) => void;
  allUsersConnectedToadmin: User[];
  setAllUsersConnectedToadmin: (users: User[]) => void;
};

const AdminContext = React.createContext<AdminContextType>({
  usersWithFiveConfirmedTimeEntries: [],
  usersWithUnconfirmedTimeEntries: [],
  setUsersWithUnconfirmedTimeEntries: () => [],
  setUsersWithFiveConfirmedTimeEntries: () => [],
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
    usersWithFiveConfirmedTimeEntries,
    setUsersWithFiveConfirmedTimeEntries,
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
        usersWithFiveConfirmedTimeEntries,
        usersWithUnconfirmedTimeEntries,
        setUsersWithUnconfirmedTimeEntries,
        setUsersWithFiveConfirmedTimeEntries,
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
