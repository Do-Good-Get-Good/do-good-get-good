import { useState } from "react";
import { superAdminMakeUserObject } from "../../../utilily/utils";
import { ChagesType } from "../ChangeRoleOrAdminPopup";

export enum ChangeButtonsKey {
  role = "role",
  admin = "admin",
  changeUser = "changeUser",
}

type ChangeButtonsType = {
  key: ChangeButtonsKey;
  title: string;
  onPress: () => void;
};

export const useChangeRoleAndConnectionButtons = () => {
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

  const onChangeUser = () => {
    console.log("onChangeUser");
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
      onPress: () => onChangeUser(),
    },
    // {
    //   key: ChangeButtonsKey.isActive,
    //   title: "Inaktivera",
    //   onPress: () => onPress,
    // },
  ];

  return {
    changeRoleAndConnectionButtons,
    isShowPopup,
    changeRoleOrAdmin,
    setShowPopup,
  };
};
