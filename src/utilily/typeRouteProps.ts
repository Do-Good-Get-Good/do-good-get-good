import { Sort } from "../lib/enums/sort";
import { User } from "./types";

export type ChangeUserScreenRouteProps = {
  userName: User["firstName"];
  userSurname: User["lastName"];
  statusActive: User["statusActive"];
  userID: User["id"];
  sortBy?: Sort;
};
