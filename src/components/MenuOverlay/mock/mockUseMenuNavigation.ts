import {
  AdminStack,
  SuperAdminStack,
  UserStack,
} from "../../../utility/routeEnums";
import { NavigationObject } from "../useMenuNavigation";

export const mockUserNav: Array<NavigationObject> = [
  {
    title: "Hem",
    screenName: "HomePage" as UserStack,
  },
  {
    title: "Min tid",
    screenName: "MyTimePage" as UserStack,
  },
  {
    title: "Om konceptet",
    screenName: "ConceptPage" as UserStack,
  },
  {
    title: "FAQ",
    screenName: "Faq" as UserStack,
  },
  {
    title: "Chat",
    screenName: "Chat" as UserStack,
  },
];

export const adminNavigations: Array<NavigationObject> = [
  {
    title: "Aktiviteter",
    screenName: "AdminActivityGallery" as AdminStack,
    toDo: jest.fn(),
  },
  {
    title: "Admin",
    screenName: "AdminPage" as AdminStack,
  },
];

export const superAdminNavigations: Array<NavigationObject> = [
  {
    title: "Alla användare",
    screenName: "AllUsersInTheSystem" as SuperAdminStack,
    toDo: jest.fn(),
  },
  {
    title: "Exportera data",
    screenName: "DownloadUserData" as SuperAdminStack,
  },
];
