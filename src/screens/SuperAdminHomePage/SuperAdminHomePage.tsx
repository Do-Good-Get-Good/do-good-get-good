import { SafeAreaView } from "react-native-safe-area-context";
import Menu from "../../components/Menu";
import BottomLogo from "../../components/BottomLogo";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { UserAndUnapprovedTimeEntriesDropDown } from "../../components/DropDowns/UserAndUnapprovedTimeEntriesDropDown";
import { useSuperAdminHomePageFunction } from "../../context/SuperAdminHomePageContext";

import { useEffect, useState } from "react";
import {
  TimeEntry,
  User,
  UserAndUnapprovedTimeEntriesType,
} from "../../utility/types";

import { TitleAndOnCheckAll } from "../../components/TitleAndOnCheckAll";

import typography from "../../assets/theme/typography";
import colors from "../../assets/theme/colors";
import { prepareAdminArray, textIfEmptyList } from "./utility";
import { SuperAdminLongButtons } from "../../components/SuperAdminLongButtons";

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
        allUsersWithUnconfirmedTimeEntries={allUsersWithUnconfirmedTimeEntries}
        setOnCheck={setOnCheck}
      />
      <ScrollView style={{ paddingHorizontal: 16 }}>
        {allAdmins.length > 0 ? (
          allAdmins.map((admin, i) => (
            <UserAndUnapprovedTimeEntriesDropDown
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
