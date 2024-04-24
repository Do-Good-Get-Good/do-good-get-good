import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

import { useChangeRoleAndConnectionButtons } from "./hooks/useChangeRoleAndConnectionButtons";
import { TextUnderlineButton } from "../Buttons/TextUnderlineButton";
import { NameRoleAdminEmail } from "./NameRoleAdminEmail";

import { ChagesType, ChangeRoleOrAdminPopup } from "./ChangeRoleOrAdminPopup";
import { Controller, UseFormGetValues } from "react-hook-form";
import { UserInfo } from "../../screens/RolesAndConnection";
import { useSuperAdminFunction } from "../../context/SuperAdminContext";

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

  return (
    <View>
      <NameRoleAdminEmail
        userName={`${user?.firstName ?? "-"} ${user?.lastName ?? "-"}`}
        role={getValues("role")}
        adminName={getValues("admin.fullName")}
        userEmail={user?.email}
      />

      <View style={styles.containerTextButton}>
        {changeRoleAndConnectionButtons.map((button, i) => (
          <TextUnderlineButton
            testID={`textUnderlineButton.${i}`}
            key={button.key}
            title={button.title}
            onPress={() =>
              button.onPress(
                user && {
                  ...user,
                  role: getValues("role"),
                  adminID: getValues("admin.id"),
                  statusActive: getValues("isActive"),
                },
              )
            }
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
});
