import { User } from "../../utility/types";

type Obj = { [key: string]: string };

export const makePopupObjectOfAdminNameAndID = (arr?: Array<User>) => {
  let newObj: Obj = {};

  arr?.forEach((item) => {
    const fullName = `${item["firstName"]} ${item["lastName"]}`;
    newObj[item["id"]] = fullName;
  });

  return newObj;
};
