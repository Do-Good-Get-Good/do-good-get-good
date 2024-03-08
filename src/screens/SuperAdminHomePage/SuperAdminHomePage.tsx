import { SafeAreaView } from "react-native-safe-area-context";
import Menu from "../../components/Menu";
import BottomLogo from "../../components/BottomLogo";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AdminAndUnapprovedTimeEntriesDropDown } from "../../components/DropDowns/AdminAndUnapprovedTimeEntriesDropDown";
import { useSuperAdminHomePageFunction } from "../../context/SuperAdminHomePageContext";

import { useEffect, useState } from "react";
import {
  TimeEntry,
  User,
  UserAndUnapprovedTimeEntriesType,
} from "../../utility/types";

import typography from "../../assets/theme/typography";
import colors from "../../assets/theme/colors";
import { prepareAdminArray, textIfEmptyList } from "./utility";
import { SuperAdminLongButtons } from "../../components/SuperAdminLongButtons";
import { TitleAndOnCheckAll } from "../../components/TitleAndOnCheckAll";
import { getUnconfirmedTimeEntriesFromAllUsers } from "../../components/TitleAndOnCheckAll/utility";

type AdminWithUsersUnapprovedTimeEntriesType = {
  adminID: User["adminID"];
  usersWithUnconfirmedTimeEntries: UserAndUnapprovedTimeEntriesType[];
};

export const SuperAdminHomePage = () => {
  const [onCheck, setOnCheck] = useState<TimeEntry[]>([]);
  const { allUsersWithUnconfirmedTimeEntries } =
    useSuperAdminHomePageFunction();
  const [allAdmins, setAllAdmins] = useState<
    Array<AdminWithUsersUnapprovedTimeEntriesType>
  >([]);

  useEffect(() => {
    setOnCheck([]);
    setAllAdmins(prepareAdminArray(allUsersWithUnconfirmedTimeEntries));
  }, [allUsersWithUnconfirmedTimeEntries]);

  return (
    <SafeAreaView>
      <Menu />
      <TitleAndOnCheckAll
        onCheck={onCheck}
        allUnconfirmedTimeEntries={getUnconfirmedTimeEntriesFromAllUsers(
          allUsersWithUnconfirmedTimeEntries,
        )}
        setOnCheck={setOnCheck}
      />
      <ScrollView style={{ paddingHorizontal: 16 }}>
        {allAdmins.length > 0 ? (
          allAdmins.map((admin, i) => (
            <AdminAndUnapprovedTimeEntriesDropDown
              key={i}
              setOnCheck={setOnCheck}
              onCheck={onCheck}
              usersTimeEtries={admin.usersWithUnconfirmedTimeEntries}
            />
          ))
        ) : (
          <Text style={styles.textEmptyList}>{textIfEmptyList}</Text>
        )}
        <SuperAdminLongButtons onCheck={onCheck} />
        <BottomLogo />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textEmptyList: {
    alignSelf: "center",
    ...typography.button.lg,
    color: colors.dark,
  },
});
