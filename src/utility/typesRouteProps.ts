import { Sort } from "../lib/enums/sort";

export type ChangeUserRouteProps = {
  userName: string;
  userSurname: string;
  statusActive: boolean;
  userID: string;
  sortBy?: Sort;
  prevRoute?: string;
};
