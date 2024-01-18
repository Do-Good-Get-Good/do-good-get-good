import { ro } from "date-fns/locale";
import { useAdminGalleryFunction } from "../../context/AdminGalleryContext";
import { useSuperAdminFunction } from "../../context/SuperAdminContext";
import { useGetAllUsersThatExistInTheSystem } from "../../hooks/super-admin/useGetAllUsersThatExistInTheSystem";
import { Role } from "../../utilily/enums";
import {
  AdminStack,
  SuperAdminStack,
  UserStack,
} from "../../utilily/routeEnums";
import { useEffect } from "react";

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
      title: "Alla användare",
      screenName: SuperAdminStack.AllUsersInTheSystem,
    },
    {
      title: "Exportera data",
      screenName: SuperAdminStack.DownloadUserData,
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
