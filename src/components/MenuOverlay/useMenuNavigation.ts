import { useAdminGalleryFunction } from "../../context/AdminGalleryContext";
import { useSuperAdminHomePageFunction } from "../../context/SuperAdminHomePageContext";

import { useGetAllUsersThatExistInTheSystem } from "../../hooks/superAdmin/useGetAllUsersThatExistInTheSystem";
import { Role } from "../../utility/enums";
import {
  AdminStack,
  SuperAdminStack,
  UserStack,
} from "../../utility/routeEnums";

export type NavigationObject = {
  title: string;
  screenName: SuperAdminStack | AdminStack | UserStack;
  toDo?: () => void;
};

export const userNavigations: Array<NavigationObject> = [
  {
    title: "Hem",
    screenName: UserStack.HomePage,
  },
  {
    title: "Min tid",
    screenName: UserStack.MyTimePage,
  },
  {
    title: "Om konceptet",
    screenName: UserStack.ConceptPage,
  },
  {
    title: "FAQ",
    screenName: UserStack.Faq,
  },
];

export const useMenuNavigation = (role: Role | undefined) => {
  const { getAllUserAndUnapprovedTimeEntries } =
    useSuperAdminHomePageFunction();
  const adminGalleryContext = useAdminGalleryFunction();
  useGetAllUsersThatExistInTheSystem(role);

  const toActivityGallery = () => {
    adminGalleryContext.chooseActiveOrNot(true);
    adminGalleryContext.setCleanUpSearchBarComponent(true);
  };

  const adminNavigations: Array<NavigationObject> = [
    {
      title: "Aktiviteter",
      screenName: AdminStack.AdminActivityGallery,
      toDo: toActivityGallery,
    },
    {
      title: "Admin",
      screenName: AdminStack.AdminPage,
    },
  ];

  const superAdminNavigations: Array<NavigationObject> = [
    {
      title: "Exportera data",
      screenName: SuperAdminStack.DownloadUserData,
    },
    {
      title: "Super admin",
      screenName: SuperAdminStack.SuperAdminHomePage,
      toDo: getAllUserAndUnapprovedTimeEntries,
    },
  ];

  switch (role) {
    case Role.user:
      return userNavigations;

    case Role.admin:
      return [...userNavigations, ...adminNavigations];

    case Role.superadmin:
      return [
        ...userNavigations,
        ...adminNavigations,
        ...superAdminNavigations,
      ];

    default:
      undefined;
  }
};
