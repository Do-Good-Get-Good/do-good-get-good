import { findIndex } from "lodash";
import { User } from "../utilily/types";

export const updateUserArray = (
  arrayToUpdate: Array<User> | undefined,
  changedUser: User,
) => {
  const index = findIndex(arrayToUpdate, ["id", changedUser.id]);
  if (index !== -1 && arrayToUpdate) {
    const newArray = [...arrayToUpdate];
    newArray.splice(index, 1, changedUser);
    return newArray;
  } else arrayToUpdate;
};
