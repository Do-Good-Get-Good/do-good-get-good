import adminStore from "../../store/adminStore";
import { Sort } from "../../lib/enums/sort";

export type UserName = {
  name: string;
  surname: string;
};

export const onUpdateUser = (
  newData: UserName,
  prevStatus: boolean,
  changedStatus: boolean,
  userID: string,
  userName: string,
  userSurname: string,
  sortBy: Sort,
) => {
  if (
    prevStatus != changedStatus ||
    newData.name != userName ||
    newData.surname != userSurname
  ) {
    adminStore.updateUser({
      userID: userID,
      userFirstName: newData.name,
      userLastName: newData.surname,
      statusActive: changedStatus,
    });
    if (sortBy === Sort.Alphabetically)
      adminStore.filterUsersByActiveStatus(true);
    else adminStore.filterUsersByActiveStatus(false);
  }
};
