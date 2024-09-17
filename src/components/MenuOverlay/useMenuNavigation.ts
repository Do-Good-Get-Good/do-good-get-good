import { useAdminContext } from "../../context/AdminContext/useAdminContext";
import { useAdminGalleryFunction } from "../../context/AdminGalleryContext";
import { useSuperAdminHomePageContext } from "../../context/SuperAdminHomePageContext";
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
  params?: any;
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
  {
    title: "Chat",
    screenName: UserStack.Chat,
    params: { getChatData: true },
  },
];

const AboutPage: NavigationObject = {
  title: "About",
  screenName: UserStack.About,
};

export const useMenuNavigation = (role: Role | undefined) => {
  const { getAllUserAndUnapprovedTimeEntries } = useSuperAdminHomePageContext();
  const { onShowUnApprovedTimeEntriesAdminPage } = useAdminContext();
  const adminGalleryContext = useAdminGalleryFunction();

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
      toDo: onShowUnApprovedTimeEntriesAdminPage,
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
      return [...userNavigations, AboutPage];

    case Role.admin:
      return [...userNavigations, ...adminNavigations, AboutPage];

    case Role.superadmin:
      return [
        ...userNavigations,
        ...adminNavigations,
        ...superAdminNavigations,
        AboutPage,
      ];

    default:
      undefined;
  }
};
