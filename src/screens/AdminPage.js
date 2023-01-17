import { StyleSheet, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { Dialog } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

import Menu from "../components/Menu";
import FloatingActionButton from "../components/FloatingActionButton";
import ConfirmActivities from "../components/ConfirmActivities";
import MyUsers from "../components/MyUsers";
import BottomLogo from "../components/BottomLogo";
import colors from "../assets/theme/colors";
import adminStore from "../store/adminStore";
import { Observer } from "mobx-react-lite";

const AdminPage = ({ navigation }) => {
  useEffect(() => {
    adminStore.fetchAllUsers();
  }, []);

  return (
    <SafeAreaView style={styles.view}>
      <Menu />
      <ScrollView style={styles.container}>
        <Observer>
          {() => (
            <>
              {adminStore.loading && (
                <Dialog.Loading
                  loadingProps={{ color: "#84BD00" }}
                ></Dialog.Loading>
              )}
              {!adminStore.loading && <ConfirmActivities />}
            </>
          )}
        </Observer>
        <MyUsers navigation={navigation} />
        <BottomLogo />
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
