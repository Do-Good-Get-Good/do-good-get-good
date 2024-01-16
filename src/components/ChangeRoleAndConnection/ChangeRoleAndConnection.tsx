import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

import { useSuperAdminFunction } from "../../context/SuperAdminContext";
import {
  ChangeButtonsKey,
  useChangeRoleAndConnectionButtons,
} from "./hooks/useChangeRoleAndConnectionButtons";
import { TextUnderlineButton } from "../Buttons/TextUnderlineButton";
import { NameRoleAdmin } from "./NameRoleAdmin";

import { ChagesType, ChangeRoleOrAdminPopup } from "./ChangeRoleOrAdminPopup";
import { Controller, UseFormGetValues } from "react-hook-form";
import { UserInfo } from "../../screens/RolesAndConnection";

type Props = {
  getValues: UseFormGetValues<UserInfo>;
  control: any;
};

export function ChangeRolesAndConnection({ getValues, control }: Props) {
  const superAdminContext = useSuperAdminFunction();

  const user = superAdminContext?.makeChangesForSelectedUser?.user;

  const {
    changeRoleAndConnectionButtons,
    isShowPopup,
    changeRoleOrAdmin,
    setShowPopup,
  } = useChangeRoleAndConnectionButtons();

  // useEffect(() => {
  //   setUser(superAdminContext.makeChangesForSelectedUser.user);
  // }, [superAdminContext.makeChangesForSelectedUser.user]);

  // useEffect(() => {
  //   serAdminName(superAdminContext.makeChangesForSelectedUser.adminName);
  // }, [superAdminContext.makeChangesForSelectedUser.adminName]);'

  return (
    <View>
      <NameRoleAdmin
        userName={user?.firstName + " " + user?.lastName}
        role={getValues("role")}
        adminName={getValues("admin.fullName")}
      />

      <View style={styles.containerTextButton}>
        {changeRoleAndConnectionButtons.map((button, i) => (
          <TextUnderlineButton
            testID={`textUnderlineButton.${i}`}
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
              testID={"textUnderlineButton.active"}
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
        render={({ field: { onChange } }) => (
          <ChangeRoleOrAdminPopup
            isShowPopup={isShowPopup}
            selected={
              changeRoleOrAdmin === ChagesType.admin
                ? getValues("admin.id")
                : getValues("role")
            }
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