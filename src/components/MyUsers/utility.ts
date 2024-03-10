import { User } from "../../utility/types";

export const filterInactiveUsers = (users: User[]) => {
  return users.filter((user) => user.statusActive === false);
};

export const sortUsersAlphabetically = (userArray: User[]) =>
  userArray.sort((a, b) => a.firstName.localeCompare(b.firstName));
