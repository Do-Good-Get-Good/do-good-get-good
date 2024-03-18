import { StyleSheet, ScrollView, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import BottomLogo from "../components/BottomLogo";

import Menu from "../components/Menu";
import * as yup from "yup";
import { ChangeRolesAndConnection } from "../components/ChangeRoleAndConnection";

import { Role } from "../utility/enums";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LongButton } from "../components/Buttons/LongButton";
import { GoBackButton } from "../components/Buttons/GoBackButton";
import { ConnectedUsersDropDown } from "../components/DropDowns/ConnectedUsersDropDown";
import { User } from "../utility/types";
import reject from "lodash/reject";
import { useSuperAdminContext } from "../context/SuperAdminContext/useSuperAdminContext";
import { useSuperAdminFunction } from "../context/SuperAdminContext";

type UserIdAndFullName = { id: string; fullName: string };

export type UserInfo = {
  role: Role;
  admin: UserIdAndFullName;
  isActive: boolean;
};

const schema: yup.ObjectSchema<UserInfo> = yup
  .object()
  .shape({
    role: yup.mixed<Role>().oneOf(Object.values(Role)).required(),
    admin: yup
      .object()
      .shape({
        id: yup.string().required(),
        fullName: yup.string().required(),
      })
      .required(),
    isActive: yup.boolean().required(),
  })

  .defined();

type Props = {
  navigation: any;
};

export const RolesAndConnection = ({ navigation }: Props) => {
  const superAdminContext = useSuperAdminFunction();
  const { onSaveChangedUser } = useSuperAdminContext();
  const user = superAdminContext?.makeChangesForSelectedUser;
  const [usersWithChangedAdmin, setUsersWithChangedAdmin] = useState<User[]>(
    [],
  );

  const { handleSubmit, control, getValues } = useForm<UserInfo>({
    defaultValues: {
      role: user?.user.role as Role,
      admin: { id: user?.user.adminID, fullName: user?.adminName },
      isActive: user?.user.statusActive,
    },
    resolver: yupResolver(schema),
  });

  const onSave = (data: UserInfo) => {
    onSaveChangedUser(data, usersWithChangedAdmin);
  };

  const onSaveUsersWithChangedAdmin = (user: User) => {
    setUsersWithChangedAdmin([
      ...reject(usersWithChangedAdmin, { id: user.id }),
      user,
    ]);
  };

  return (
    <SafeAreaView>
      <Menu />

      <ScrollView>
        <View style={styles.container}>
          <GoBackButton onPress={() => navigation.goBack()} />
          <ChangeRolesAndConnection control={control} getValues={getValues} />
          <ConnectedUsersDropDown
            onSaveUsersWithChangedAdmin={onSaveUsersWithChangedAdmin}
          />
          <LongButton
            style={{ marginTop: 50 }}
            onPress={handleSubmit(onSave)}
            title={"Spara"}
          />

          <View style={styles.logoStyle}>
            <BottomLogo />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    paddingBottom: 40,
  },

  logoStyle: {
    marginBottom: 7,
  },
});
