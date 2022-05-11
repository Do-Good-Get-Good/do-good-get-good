import { StyleSheet, ScrollView, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Menu from "../components/Menu";
import FloatingActionButton from "../components/FloatingActionButton";
import BottomLogo from "../components/BottomLogo";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";

const AdminPage = () => {
  return (
    <SafeAreaView style={styles.view}>
      <Menu />
      <ScrollView style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ ...typography.title, marginTop: 16 }}>
            SuperAdminPage
          </Text>
          <BottomLogo />
        </View>
      </ScrollView>
      <FloatingActionButton />
    </SafeAreaView>
  );
};

export default AdminPage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  view: {
    flex: 1,
    backgroundColor: colors.light,
  },
});
