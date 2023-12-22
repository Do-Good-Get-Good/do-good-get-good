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
import { User } from "../utilily/types";
import { Role } from "../utilily/enums";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LongButton } from "../components/Buttons/LongButton";
type UserIdAndFullName = { id: string; fullName: string };

type UserInfo = {
  role: Role;
  admin: UserIdAndFullName;
  isActive: boolean;
  connectedUsers?: Array<UserIdAndFullName> | undefined;
};

const schema: yup.ObjectSchema<UserInfo> = yup
  .object()
  .shape({
    role: yup
      .mixed<Role>()
      .oneOf(Object.values(Role), "* Obligatorisk")
      .required(),
    admin: yup
      .object()
      .shape({
        id: yup.string().required(),
        fullName: yup.string().required(),
      })
      .required(),
    isActive: yup.boolean().required(),
    connectedUsers: yup.array().of(
      yup.object().shape({
        id: yup.string().required(),
        fullName: yup.string().required(),
      }),
    ),
  })
  .defined();

type Props = {
  navigation: any;
};

export const RolesAndConnection = ({ navigation }: Props) => {
  const superAdminContext = useSuperAdminFunction();
  const allAdminsAnsSuperAdmins = superAdminContext.allAdminsAnsSuperAdmins;

  const user = superAdminContext.makeChangesForSelectedUser;
  console.log(user.user, "------------------ user");

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors, isDirty },
  } = useForm<UserInfo>({
    defaultValues: {
      role: user.user.role,
      admin: { id: user.user.adminId, fullName: user.adminName },
      isActive: user.user.statusActive,
      connectedUsers: user.arrayOfUsersIfAdmin,
    },
    resolver: yupResolver(schema),
  });

  const onSave = () => {
    //  superAdminContext.setButtonToSaveChanhgesPressed(true)
  };

  return (
    <SafeAreaView>
      <Menu />

      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ flexDirection: "row" }}
          >
            <Icon
              color={colors.dark}
              name="arrow-left"
              type="material-community"
              size={25}
            />
            <Text style={styles.textGoBackButton}>Gå tillbaka</Text>
          </TouchableOpacity>

          <ChangeRolesAndConnection
            control={control}
            role={getValues("role")}
            adminName={getValues("admin.fullName")}
          />

          <ConnectedUsersDropDown />
          <LongButton onPress={handleSubmit(onSave)} title={"Spara"} />

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
  textGoBackButton: {
    marginLeft: 10,
    paddingTop: 4,
    textDecorationLine: "underline",
    fontWeight: "500",
    ...typography.b2,
  },

  logoStyle: {
    marginBottom: 7,
  },
});
