import { useState } from "react";
import { ChagesType } from "../ChangeRoleOrAdminPopup";

import { NavigationProp, useNavigation } from "@react-navigation/native";
import { User } from "../../../utilily/types";
import { SuperAdminStack } from "../../../utilily/routeEnums";
import { ChangeUserScreenRouteProps } from "../../../utilily/typeRouteProps";

export enum ChangeButtonsKey {
  role = "role",
  admin = "admin",
  changeUser = "changeUser",
}

type ChangeButtonsType = {
  key: ChangeButtonsKey;
  title: string;
  onPress: (user?: User) => void;
};

export const useChangeRoleAndConnectionButtons = () => {
  const navigation = useNavigation();

  const [isShowPopup, setShowPopup] = useState(false);
  const [changeRoleOrAdmin, setChangeRoleOrAdmin] = useState<
    ChagesType | undefined
  >(undefined);

  const onChangeRole = () => {
    setChangeRoleOrAdmin(ChagesType.role), setShowPopup(!isShowPopup);
  };

  const onChangeAdmin = () => {
    setChangeRoleOrAdmin(ChagesType.admin), setShowPopup(!isShowPopup);
  };

  const onChangeUser = (user: User) => {
    user &&
      navigation.navigate("ChangeUser", {
        userName: user.firstName,
        userSurname: user.lastName,
        statusActive: user.statusActive,
        userID: user.id,
      });
  };

  const changeRoleAndConnectionButtons: ChangeButtonsType[] = [
    {
      key: ChangeButtonsKey.role,
      title: "Ändra nivå",
      onPress: () => onChangeRole(),
    },
    {
      key: ChangeButtonsKey.admin,
      title: "Ändra admin",
      onPress: () => onChangeAdmin(),
    },
    {
      key: ChangeButtonsKey.changeUser,
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
// NavigationProp<SuperAdminStack>>
