import flatMap from "lodash/flatMap";
import { User, UserAndUnapprovedTimeEntriesType } from "../../utility/types";

export const getUnconfirmedTimeEntriesFromAllUsers = (
  users: UserAndUnapprovedTimeEntriesType[]
) => [...flatMap(users, (u) => u.unapprovedTimeEntries.map((entry) => entry))];

export const getUnconfirmedTimeEntriesFromAllUsersAdminPage = (
  users: User[]
) => [
  ...flatMap(users, (u) =>
    u?.timeEntries ? u.timeEntries.map((entry) => entry) : []
  ),
];
