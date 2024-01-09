import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import BottomLogo from "../components/BottomLogo";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";

import { Icon } from "@rneui/base";

import { useSuperAdminFunction } from "../context/SuperAdminContext";
import Menu from "../components/Menu";
import * as yup from "yup";
import { ChangeRolesAndConnection } from "../components/ChangeRoleAndConnection";
import ConnectedUsersDropDown from "../components/ConnectedUsersDropDown";
import { Role } from "../utilily/enums";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LongButton } from "../components/Buttons/LongButton";
import { superAdminUpdatesUserInfo } from "../firebase-functions/updateTS/superAdminUpdatesUserInfo";
import { GoBackButton } from "../components/Buttons/GoBackButton";
type UserIdAndFullName = { id: string; fullName: string };

export type UserInfo = {
  role: Role;
  admin: UserIdAndFullName;
  isActive: boolean;
  // connectedUsers?: Array<UserIdAndFullName> | undefined;
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
    // connectedUsers: yup
    //   .array()

    //   .of(
    //     yup.object().shape({
    //       id: yup.string().required(),
    //       fullName: yup.string().required(),
    //     }),
    //   )
    //   .optional(),
  })
  .defined();

type Props = {
  navigation: any;
};

export const RolesAndConnection = ({ navigation }: Props) => {
  const superAdminContext = useSuperAdminFunction();
  const user = superAdminContext?.makeChangesForSelectedUser;

  const { handleSubmit, control, getValues } = useForm<UserInfo>({
    defaultValues: {
      role: user?.user.role as Role,
      admin: { id: user?.user.adminID, fullName: user?.adminName },
      isActive: user?.user.statusActive,
      // connectedUsers: user?.arrayOfUsersIfAdmin ?? undefined,
    },
    resolver: yupResolver(schema),
  });

  const onSave = (data: UserInfo) => {
    if (user?.user && data?.role) {
      return superAdminUpdatesUserInfo(
        user.user.id,
        user.user.firstName,
        user.user.lastName,
        data.isActive,
        data?.role,
        data.admin.id,
      );
    }
  };

  return (
    <SafeAreaView>
      <Menu />

      <ScrollView>
        <View style={styles.container}>
          <GoBackButton onPress={() => navigation.goBack()} />
          <ChangeRolesAndConnection control={control} getValues={getValues} />

          {/* <ConnectedUsersDropDown /> */}
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
