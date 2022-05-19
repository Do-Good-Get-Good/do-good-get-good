import { StyleSheet, ScrollView, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Menu from "../components/Menu";
import FloatingActionButton from "../components/FloatingActionButton";
import BottomLogo from "../components/BottomLogo";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";
import ChangeRolesAndConnection from "../components/ChangeRoleAndConnection";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";

//screen
export function RolesAndConnection({ navigation, route }) {
  const { user, adminName } = route.params;

  console.log("adminName  ", adminName);
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
