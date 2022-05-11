import { StyleSheet, ScrollView } from "react-native";
import React from "react";

import Menu from "../components/Menu";
import FloatingActionButton from "../components/FloatingActionButton";
import ConfirmActivities from "../components/ConfirmActivities";
import MyUsers from "../components/MyUsers";
import BottomLogo from "../components/BottomLogo";

const AdminPage = ({ navigation }) => {
  return (
    <>
      <Menu />
      <ScrollView style={styles.container}>
        <ConfirmActivities />
        <MyUsers navigation={navigation} />
        <BottomLogo />
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
