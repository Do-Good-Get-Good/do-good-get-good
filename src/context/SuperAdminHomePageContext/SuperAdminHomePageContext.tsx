import React, { useContext, useEffect, useState } from "react";

import {
  TimeEntry,
  User,
  UserAndUnapprovedTimeEntriesType,
  UserObjectForSuperAdmin,
} from "../../utilily/types";
import { useSuperAdminHomePageContext } from "./useSuperAdminHomePageContext";
import { getAllUnconfirmedTimeEntries } from "../../firebase-functions/getTS/get";
// import { confirmTimeEntry } from "../../firebase-functions/updateTS/update";
// import { filter, isEmpty, reject, remove, set } from "lodash";

type SuperAdminHomePageContextType = {
  allUsersWithUnconfirmedTimeEntries: Array<UserAndUnapprovedTimeEntriesType>;
  getAllUserAndUnapprovedTimeEntries: () => void;
  setAllUsersWithUnconfirmedTimeEntries: (
    users: UserAndUnapprovedTimeEntriesType[],
  ) => void;
  // onApproveTimeEntries: (
  //   timeEntries: Array<TimeEntry["id"]>,
  //   approvedBy: User["id"],
  // ) => void;
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

  // const onApproveTimeEntries = (
  //   timeEntries: Array<TimeEntry["id"]>,
  //   approvedBy: User["id"],
  // ) => {
  //   timeEntries.map(
  //     async (timeEntryID) =>
  //       await confirmTimeEntry(timeEntryID, approvedBy).then(() => {
  //         setAllUsersWithUnconfirmedTimeEntries((prevUsers) => {
  //           return prevUsers
  //             .map((user) => ({
  //               ...user,
  //               unapprovedTimeEntries: reject(user.unapprovedTimeEntries, {
  //                 id: timeEntryID,
  //               }) as TimeEntry[],
  //             }))
  //             .filter((user) => user.unapprovedTimeEntries.length > 0);
  //         });
  //       }),
  //   );
  // };

  return (
    <SuperAdminHomePageContext.Provider
      value={{
        allUsersWithUnconfirmedTimeEntries,
        getAllUserAndUnapprovedTimeEntries,
        setAllUsersWithUnconfirmedTimeEntries,
        // onApproveTimeEntries,
      }}
    >
      {children}
    </SuperAdminHomePageContext.Provider>
  );
};
