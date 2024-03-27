import { Sort } from "../lib/enums/sort";
import { User } from "./types";

export type ChangeUserRouteProps = {
  user: User;
  prevRoute?: string;
};
