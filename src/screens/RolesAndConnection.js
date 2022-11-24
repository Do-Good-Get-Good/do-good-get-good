import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import BottomLogo from "../components/BottomLogo";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";

import { Icon } from "react-native-elements";

import { useSuperAdminFunction } from "../context/SuperAdminContext";
import Menu from "../components/Menu";

import ChangeRolesAndConnection from "../components/ChangeRoleAndConnection";
import ConnectedUsersDropDown from "../components/ConnectedUsersDropDown";

export function RolesAndConnection({ navigation, route }) {
  const superAdminContext = useSuperAdminFunction();

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

          <ChangeRolesAndConnection />
          {superAdminContext.makeChangesForSelectedUser.user.role === "admin" ||
          superAdminContext.makeChangesForSelectedUser.user.role ===
            "superadmin" ? (
            <ConnectedUsersDropDown />
          ) : null}
          <TouchableOpacity
            onPress={() =>
              superAdminContext.setButtonToSaveChanhgesPressed(true)
            }
            style={styles.saveButton}
          >
            <Text style={styles.saveButtonText}>Spara</Text>
          </TouchableOpacity>
          <View style={styles.logoStyle}>
            <BottomLogo />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default RolesAndConnection;
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
  saveButton: {
    borderRadius: 5,
    backgroundColor: colors.primary,
    height: 50,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 134,
  },
  saveButtonText: {
    ...typography.button.lg,
    fontWeight: "500",
  },
  logoStyle: {
    marginBottom: 7,
  },
});
