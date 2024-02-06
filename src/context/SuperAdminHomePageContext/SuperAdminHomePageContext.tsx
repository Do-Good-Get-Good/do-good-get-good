import React, { useContext, useEffect, useState } from "react";

import {
  TimeEntry,
  User,
  UserAndUnapprovedTimeEntriesType,
  UserObjectForSuperAdmin,
} from "../../utilily/types";
import { useSuperAdminHomePageContext } from "./useSuperAdminHomePageContext";
import { getAllUnconfirmedTimeEntries } from "../../firebase-functions/getTS/get";

type SuperAdminHomePageContextType = {
  allUsersWithUnconfirmedTimeEntries: Array<UserAndUnapprovedTimeEntriesType>;
  getAllUserAndUnapprovedTimeEntries: () => void;
  setAllUsersWithUnconfirmedTimeEntries: (
    users: UserAndUnapprovedTimeEntriesType[],
  ) => void;
};

const SuperAdminHomePageContext = React.createContext<
  SuperAdminHomePageContextType | undefined
>(undefined);

export const useSuperAdminHomePageFunction = () => {
  return useContext(SuperAdminHomePageContext);
};

export const SuperAdminHomePageContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { usersWithUnconfirmedTimeEntries } = useSuperAdminHomePageContext();
  const [
    allUsersWithUnconfirmedTimeEntries,
    setAllUsersWithUnconfirmedTimeEntries,
  ] = useState<UserAndUnapprovedTimeEntriesType[]>([]);

  const getAllUserAndUnapprovedTimeEntries = async () => {
    const unconfirmedTimeEntries = await getAllUnconfirmedTimeEntries();

    let usersAndUnconfirmedTimeEntries = await usersWithUnconfirmedTimeEntries(
      unconfirmedTimeEntries,
    );
    usersAndUnconfirmedTimeEntries &&
      setAllUsersWithUnconfirmedTimeEntries(usersAndUnconfirmedTimeEntries);
  };

  return (
    <SuperAdminHomePageContext.Provider
      value={{
        allUsersWithUnconfirmedTimeEntries,
        getAllUserAndUnapprovedTimeEntries,
        setAllUsersWithUnconfirmedTimeEntries,
      }}
    >
      {children}
    </SuperAdminHomePageContext.Provider>
  );
};
