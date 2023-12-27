import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

import { useSuperAdminFunction } from "../../context/SuperAdminContext";
import {
  ChangeButtonsKey,
  useChangeRoleAndConnectionButtons,
} from "./useChangeRoleAndConnectionButtons";
import { TextUnderlineButton } from "../Buttons/TextUnderlineButton";
import { NameRoleAdmin } from "./NameRoleAdmin";
import { Role } from "../../utilily/enums";

import { PopupWithRadioButtons } from "../Popup/PopupWithRadioButtons";
import { roleTitles } from "../../utilily/utils";

import { ChangeRoleOrAdminPopup } from "./ChangeRoleOrAdminPopup";
import { Controller, UseFormGetValues } from "react-hook-form";
import { UserInfo } from "../../screens/RolesAndConnection";

type Props = {
  // role: Role;
  getValues: UseFormGetValues<UserInfo>;
  adminName: string;
  control: any;
};

export function ChangeRolesAndConnection({
  getValues,
  adminName,
  control,
}: Props) {
  const superAdminContext = useSuperAdminFunction();
  const allAdminsAnsSuperAdmins = superAdminContext.allAdminsAnsSuperAdmins;
  const user = superAdminContext.makeChangesForSelectedUser?.user;

  const {
    changeRoleAndConnectionButtons,
    isShowPopup,
    changeRoleOrAdmin,
    setShowPopup,
  } = useChangeRoleAndConnectionButtons();

  // const allAdmins = makeObjectFromArrayValues(
  //   "docId",
  //   "firstName",
  //   allAdminsAnsSuperAdmins,
  // );

  // useEffect(() => {
  //   setUser(superAdminContext.makeChangesForSelectedUser.user);
  // }, [superAdminContext.makeChangesForSelectedUser.user]);

  // useEffect(() => {
  //   serAdminName(superAdminContext.makeChangesForSelectedUser.adminName);
  // }, [superAdminContext.makeChangesForSelectedUser.adminName]);

  return (
    <View>
      <NameRoleAdmin
        userName={user?.firstName + " " + user?.lastName}
        role={getValues("role")}
        adminName={adminName}
      />

      <View style={styles.containerTextButton}>
        {changeRoleAndConnectionButtons.map((button, i) => (
          <TextUnderlineButton
            key={button.key}
            title={button.title}
            onPress={() => button.onPress()}
          />
        ))}
        <Controller
          name={"isActive"}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextUnderlineButton
              title={value ? "Inaktivera" : "Aktivera"}
              onPress={() => onChange(!value)}
            />
          )}
        />
      </View>
      <Controller
        name={changeRoleOrAdmin ?? "none"}
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <ChangeRoleOrAdminPopup
            isShowPopup={isShowPopup}
            changeRoleOrAdmin={changeRoleOrAdmin}
            setShowPopup={() => setShowPopup(!isShowPopup)}
            onChange={onChange}
          />
        )}
      />
    </View>
  );
}
export default ChangeRolesAndConnection;
const styles = StyleSheet.create({
  containerTextButton: {
    marginTop: 40,
    marginLeft: 2,
  },
  // overlayStyle: {
  //   backgroundColor: colors.light,
  //   width: "90%",
  //   height: "35%",
  //   borderRadius: 5,
  // },

  textAsButton: {
    textDecorationLine: "underline",
    fontWeight: "700",
    paddingVertical: 10,
  },
});
