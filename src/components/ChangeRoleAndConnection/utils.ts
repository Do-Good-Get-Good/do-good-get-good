import { User } from "../../utilily/types";

export const makePopupObjectOfAdminNameAndID = (arr: Array<User>) => {
  let newObj: { [key: string]: any } = {};
  let adminNameAndID = [];
  arr.map((item) => {
    adminNameAndID.push(
      (newObj[item["id"]] = `${item["firstName"]} ${item["lastName"]}`),
    );
  });
};
