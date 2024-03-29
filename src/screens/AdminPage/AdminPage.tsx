import { StyleSheet, ScrollView, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Menu from "../../components/Menu";
import FloatingActionButton from "../../components/FloatingActionButton";

import { MyUsers } from "../../components/MyUsers";
import BottomLogo from "../../components/BottomLogo";
import colors from "../../assets/theme/colors";
import { UserAndUnapprovedTimeEntries } from "../../components/DropDowns/UserAndUpapprovedTimeEntries";
import { useAdminFunction } from "../../context/AdminContext";
import { useAdminContext } from "../../context/AdminContext/useAdminContext";

import { Spinner } from "../../components/Loading";

type Props = {
  navigation: any;
};

export const AdminPage = ({ navigation }: Props) => {
  const {
    usersWithUnconfirmedTimeEntries,
    usersWithFiveConfirmedTimeEntries,
    loading,
  } = useAdminFunction();
  const { onApproveTimeEntriesAdmin } = useAdminContext();

  return (
    <SafeAreaView style={styles.view}>
      <Menu />
      <ScrollView style={styles.container}>
        <UserAndUnapprovedTimeEntries
          onApproveTimeEntriesAdmin={onApproveTimeEntriesAdmin}
          users={usersWithUnconfirmedTimeEntries}
          loading={loading}
        />
        <Spinner loading={loading} />
        <MyUsers users={usersWithFiveConfirmedTimeEntries} />
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
