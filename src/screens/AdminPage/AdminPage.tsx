import { StyleSheet, ScrollView, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Menu from "../../components/Menu";
import FloatingActionButton from "../../components/FloatingActionButton";

import MyUsers from "../../components/MyUsers";
import BottomLogo from "../../components/BottomLogo";
import colors from "../../assets/theme/colors";
import { Observer } from "mobx-react-lite";
import { UserAndUnapprovedTimeEntries } from "../../components/UserAndUpapprovedTimeEntries";

//  <Observer>{() => <ConfirmActivities />}</Observer>

type Props = {
  route: any;
  navigation: any;
};

export const AdminPage = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.view}>
      <Menu />
      <ScrollView style={styles.container}>
        <UserAndUnapprovedTimeEntries />
        <MyUsers navigation={navigation} />
        <BottomLogo />
      </ScrollView>
      <FloatingActionButton />
    </SafeAreaView>
  );
};

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
