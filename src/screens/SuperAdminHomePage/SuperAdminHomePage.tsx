import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../assets/theme/colors";
import typography from "../../assets/theme/typography";
import BottomLogo from "../../components/BottomLogo";
import { AdminAndUnapprovedTimeEntriesDropDown } from "../../components/DropDowns/AdminAndUnapprovedTimeEntriesDropDown";
import { Spinner } from "../../components/Loading";
import Menu from "../../components/Menu";
import { SuperAdminLongButtons } from "../../components/SuperAdminLongButtons";
import { TitleAndOnCheckAll } from "../../components/TitleAndOnCheckAll";
import { getUnconfirmedTimeEntriesFromAllUsers } from "../../components/TitleAndOnCheckAll/utility";
import {
  useSuperAdminHomePageContext,
  useSuperAdminHomePageFunction,
} from "../../context/SuperAdminHomePageContext";
import { useUserLevel } from "../../context/useUserLevel";
import { useGetAllUsersThatExistInTheSystem } from "../../hooks/superAdmin/useGetAllUsersThatExistInTheSystem";
import { SuperAdminStack } from "../../utility/routeEnums";
import {
  TimeEntry,
  User,
  UserAndUnapprovedTimeEntriesType,
} from "../../utility/types";
import { prepareAdminArray, textIfEmptyList } from "./utility";

type AdminWithUsersUnapprovedTimeEntriesType = {
  adminID: User["adminID"];
  usersWithUnconfirmedTimeEntries: UserAndUnapprovedTimeEntriesType[];
};

const superAdminID = auth().currentUser?.uid;

export const SuperAdminHomePage = () => {
  const [onCheck, setOnCheck] = useState<TimeEntry[]>([]);
  const { allUsersWithUnconfirmedTimeEntries } =
    useSuperAdminHomePageFunction();
  const [allAdmins, setAllAdmins] = useState<
    Array<AdminWithUsersUnapprovedTimeEntriesType>
  >([]);
  const { userLevel } = useUserLevel();
  const { onGetAllActiveUsers } = useGetAllUsersThatExistInTheSystem(userLevel);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<{
    navigate: (nav: SuperAdminStack) => void;
  }>();
  const { onApproveTimeEntriesSuperadmin } = useSuperAdminHomePageContext();

  const onAllUsers = async () => {
    setLoading(true);
    await onGetAllActiveUsers();
    navigation.navigate(SuperAdminStack.AllUsersInTheSystem);
    setLoading(false);
  };

  const onApprove = async () => {
    if (superAdminID !== undefined) {
      setLoading(true);
      await onApproveTimeEntriesSuperadmin(onCheck, superAdminID);
      setLoading(false);
    }
  };

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
          allUsersWithUnconfirmedTimeEntries
        )}
        setOnCheck={setOnCheck}
      />
      <Spinner loading={loading} />
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
        <SuperAdminLongButtons
          isDisabled={onCheck.length < 1}
          onAllUsers={onAllUsers}
          onApprove={onApprove}
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
