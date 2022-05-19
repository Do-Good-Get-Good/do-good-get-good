import { StyleSheet, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import BottomLogo from "../components/BottomLogo";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";

import Menu from "../components/Menu";
import ChangeRolesAndConnection from "../components/ChangeRoleAndConnection";
import ConnectedUsersDropDown from "../components/ConnectedUsersDropDown";

//screen
export function RolesAndConnection({ navigation, route }) {
  const { user, adminName, arrayOfUsersIfAdmin } = route.params;

  return (
    <SafeAreaView>
      <Menu />
      <ScrollView style={styles.container}>
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
        <ChangeRolesAndConnection user={user} adminName={adminName} />
        {user.role === "admin" || user.role === "superadmin" ? (
          <ConnectedUsersDropDown
            usersConnectedToTheAdmin={arrayOfUsersIfAdmin}
            adminName={adminName}
          />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
export default RolesAndConnection;
const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  textGoBackButton: {
    marginLeft: 10,
    paddingTop: 4,
    textDecorationLine: "underline",
    fontWeight: "500",
    ...typography.b2,
  },
});
