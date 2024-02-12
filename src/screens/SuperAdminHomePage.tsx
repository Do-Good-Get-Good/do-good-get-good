import { SafeAreaView } from "react-native-safe-area-context";
import Menu from "../components/Menu";
import BottomLogo from "../components/BottomLogo";
import { ScrollView, StyleSheet, Text } from "react-native";
import { UserAndUnapprovedTimeEntriesDropDown } from "../components/DropDowns/UserAndUnapprovedTimeEntriesDropDown";
import { useSuperAdminHomePageFunction } from "../context/SuperAdminHomePageContext";

import { LongButton } from "../components/Buttons/LongButton";
import { useEffect, useState } from "react";
import {
  TimeEntry,
  User,
  UserAndUnapprovedTimeEntriesType,
} from "../utilily/types";

import { TitleAndOnCheckAll } from "../components/TitleAndOnCheckAll";
import { useSuperAdminHomePageContext } from "../context/SuperAdminHomePageContext/useSuperAdminHomePageContext";
import groupBy from "lodash/groupBy";
import auth from "@react-native-firebase/auth";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";
import { SuperAdminStack } from "../utilily/routeEnums";
import { useNavigation } from "@react-navigation/native";

const superAdminID = auth()?.currentUser?.uid;

const prepareAdminArray = (arr: UserAndUnapprovedTimeEntriesType[]) => {
  const groupedByAdmin = groupBy(arr, (entry) => entry.adminID);
  const result = Object.keys(groupedByAdmin).map((adminID) => ({
    adminID,
    usersWithUnconfirmedTimeEntries: groupedByAdmin[adminID],
  }));

  return result;
};

type AdminWithUsersUnapprovedTimeEntriesType = {
  adminID: User["adminID"];
  usersWithUnconfirmedTimeEntries: UserAndUnapprovedTimeEntriesType[];
};

export const SuperAdminHomePage = () => {
  const navigation = useNavigation<{
    navigate: (nav: SuperAdminStack) => void;
  }>();

  const context = useSuperAdminHomePageFunction();
  const { onApproveTimeEntries } = useSuperAdminHomePageContext();

  const allUsersWithUnconfirmedTimeEntries =
    context?.allUsersWithUnconfirmedTimeEntries ?? [];

  const [onCheck, setOnCheck] = useState<TimeEntry["id"][]>([]);
  const [allAdmins, setAllAdmins] = useState<
    Array<AdminWithUsersUnapprovedTimeEntriesType>
  >([]);

  const textIfEmptyList = "Inga admins att visa";

  const onApprove = () => {
    if (superAdminID !== undefined) onApproveTimeEntries(onCheck, superAdminID);
  };

  useEffect(() => {
    setOnCheck([]);
    setAllAdmins(prepareAdminArray(allUsersWithUnconfirmedTimeEntries));
  }, [allUsersWithUnconfirmedTimeEntries]);

  const onNavigateToListOfAllUsers = () => {
    navigation.navigate(SuperAdminStack.AllUsersInTheSystem);
  };

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
        <LongButton
          isDisabled={onCheck.length < 1}
          style={{ marginTop: 20 }}
          title="Godkänn"
          onPress={onApprove}
          testID="on-save"
        />
        <LongButton
          style={{ marginTop: 20 }}
          title="Alla användare"
          onPress={onNavigateToListOfAllUsers}
          testID="to-all-users"
        />

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
