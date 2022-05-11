import { StyleSheet, ScrollView, Text, View } from "react-native";
import React from "react";

import Menu from "../components/Menu";
import FloatingActionButton from "../components/FloatingActionButton";
import BottomLogo from "../components/BottomLogo";
import typography from "../assets/theme/typography";

const AdminPage = () => {
  return (
    <>
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
    </>
  );
};

export default AdminPage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
});
