import { yupResolver } from "@hookform/resolvers/yup";
import reject from "lodash/reject";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";
import BottomLogo from "../components/BottomLogo";
import { GoBackButton } from "../components/Buttons/GoBackButton";
import { LongButton } from "../components/Buttons/LongButton";
import { ChangeRolesAndConnection } from "../components/ChangeRoleAndConnection";
import { ConnectedUsersDropDown } from "../components/DropDowns/ConnectedUsersDropDown";
import { Spinner } from "../components/Loading";
import Menu from "../components/Menu";
import { useSuperAdminFunction } from "../context/SuperAdminContext";
import { useSuperAdminContext } from "../context/SuperAdminContext/useSuperAdminContext";
import { Role } from "../utility/enums";
import { User } from "../utility/types";

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

export const RolesAndConnection = ({}) => {
  const superAdminContext = useSuperAdminFunction();
  const { onSaveChangedUser, loading } = useSuperAdminContext();
  const user = superAdminContext?.makeChangesForSelectedUser;
  const [usersWithChangedAdmin, setUsersWithChangedAdmin] = useState<User[]>(
    []
  );

  const { handleSubmit, control, getValues } = useForm<UserInfo>({
    defaultValues: {
      role: user?.user.role as Role,
      admin: { id: user?.user.adminID, fullName: user?.adminName },
      isActive: user?.user.statusActive,
    },
    resolver: yupResolver(schema),
  });

  const onSave = (changes: UserInfo) => {
    onSaveChangedUser(changes, usersWithChangedAdmin);
  };

  const onSaveUsersWithChangedAdmin = (user: User) => {
    setUsersWithChangedAdmin([
      ...reject(usersWithChangedAdmin, { id: user.id }),
      user,
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Menu />
      <GoBackButton />
      <ScrollView>
        <View style={styles.container}>
          <ChangeRolesAndConnection control={control} getValues={getValues} />
          <Spinner loading={loading} />
          <ConnectedUsersDropDown
            onSaveUsersWithChangedAdmin={onSaveUsersWithChangedAdmin}
          />

          <View style={styles.logoStyle}>
            <BottomLogo />
          </View>
        </View>
      </ScrollView>
      <LongButton
        isDisabled={loading}
        style={{ borderRadius: 0 }}
        onPress={handleSubmit(onSave)}
        title={"Spara"}
      />
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
