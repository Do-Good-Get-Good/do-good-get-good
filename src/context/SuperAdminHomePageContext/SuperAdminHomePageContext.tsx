import React, { useContext, useState } from "react";

import { UserAndUnapprovedTimeEntriesType } from "../../utility/types";

type SuperAdminHomePageContextType = {
  allUsersWithUnconfirmedTimeEntries: Array<UserAndUnapprovedTimeEntriesType>;

  setAllUsersWithUnconfirmedTimeEntries: (
    users: UserAndUnapprovedTimeEntriesType[]
  ) => void;
};

const SuperAdminHomePageContext =
  React.createContext<SuperAdminHomePageContextType>({
    allUsersWithUnconfirmedTimeEntries: [],

    setAllUsersWithUnconfirmedTimeEntries: () => [],
  });

export const useSuperAdminHomePageFunction = () => {
  return useContext(SuperAdminHomePageContext);
};

export const SuperAdminHomePageContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [
    allUsersWithUnconfirmedTimeEntries,
    setAllUsersWithUnconfirmedTimeEntries,
  ] = useState<UserAndUnapprovedTimeEntriesType[]>([]);

  return (
    <SuperAdminHomePageContext.Provider
      value={{
        allUsersWithUnconfirmedTimeEntries,
        setAllUsersWithUnconfirmedTimeEntries,
      }}
    >
      {children}
    </SuperAdminHomePageContext.Provider>
  );
};
