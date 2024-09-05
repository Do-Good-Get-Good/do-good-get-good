import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../assets/theme/colors";
import BottomLogo from "../../components/BottomLogo";
import { UserAndUnapprovedTimeEntries } from "../../components/DropDowns/UserAndUpapprovedTimeEntries";
import FloatingActionButton from "../../components/FloatingActionButton";
import { Spinner } from "../../components/Loading";
import Menu from "../../components/Menu";
import { MyUsers } from "../../components/MyUsers";
import { useAdminFunction } from "../../context/AdminContext";
import { useAdminContext } from "../../context/AdminContext/useAdminContext";

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
