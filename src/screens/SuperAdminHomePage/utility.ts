import groupBy from "lodash/groupBy";
import { UserAndUnapprovedTimeEntriesType } from "../../utility/types";

export const prepareAdminArray = (arr: UserAndUnapprovedTimeEntriesType[]) => {
  const groupedByAdmin = groupBy(arr, (entry) => entry.adminID);
  const result = Object.keys(groupedByAdmin).map((adminID) => ({
    adminID,
    usersWithUnconfirmedTimeEntries: groupedByAdmin[adminID],
  }));

  return result;
};

export const textIfEmptyList = "Inga admins att visa";
