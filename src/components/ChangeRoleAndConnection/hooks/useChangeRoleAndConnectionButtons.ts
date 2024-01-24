import { useState } from "react";
import { ChagesType } from "../ChangeRoleOrAdminPopup";
import { useNavigation } from "@react-navigation/native";
import { AdminStack, SuperAdminStack } from "../../../utilily/routeEnums";
import { User } from "../../../utilily/types";
import { ChangeUserRouteProps } from "../../../utilily/typesRouteProps";

type ChangeButtonsType = {
  key: string;
  title: string;
  onPress: (user?: User) => void;
};

export const useChangeRoleAndConnectionButtons = () => {
  const [isShowPopup, setShowPopup] = useState(false);
  const [changeRoleOrAdmin, setChangeRoleOrAdmin] = useState<
    ChagesType | undefined
  >(undefined);
  const navigation = useNavigation<{
    navigate: (nav: AdminStack, props: ChangeUserRouteProps) => void;
  }>();

  const onChangeRole = () => {
    setChangeRoleOrAdmin(ChagesType.role), setShowPopup(!isShowPopup);
  };

  const onChangeAdmin = () => {
    setChangeRoleOrAdmin(ChagesType.admin), setShowPopup(!isShowPopup);
  };

  const onChangeUser = (user: User) => {
    navigation.navigate(AdminStack.ChangeUser, {
      userName: user.firstName,
      userSurname: user.lastName,
      statusActive: user.statusActive,
      userID: user.id,
      prevRoute: SuperAdminStack.RolesAndConnection,
    });
  };

  const changeRoleAndConnectionButtons: ChangeButtonsType[] = [
    {
      key: "role",
      title: "Ändra nivå",
      onPress: () => onChangeRole(),
    },
    {
      key: "admin",
      title: "Ändra admin",
      onPress: () => onChangeAdmin(),
    },
    {
      key: "changeUser",
      title: "Ändra användare",
      onPress: (user?: User) => user && onChangeUser(user),
    },
  ];

  return {
    changeRoleAndConnectionButtons,
    isShowPopup,
    changeRoleOrAdmin,
    setShowPopup,
  };
};
