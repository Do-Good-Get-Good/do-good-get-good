import { User } from "../../utility/types";

export const filterByStatusAndSortAlphabetically = (
  users: User[],
  isActive: boolean
) => {
  let filteredUsers = users.filter((user) => user.statusActive === isActive);
  return filteredUsers.sort((a, b) => a.firstName.localeCompare(b.firstName));
};
