import { SafeAreaView } from "react-native-safe-area-context";
import Menu from "../components/Menu";
import BottomLogo from "../components/BottomLogo";
import { ScrollView, View } from "react-native";
import { UserAndUnapprovedTimeEntriesDropDown } from "../components/DropDowns/UserAndUnapprovedTimeEntriesDropDown";
import { useSuperAdminHomePageFunction } from "../context/SuperAdminHomePageContext";
import { LongButton } from "../components/Buttons/LongButton";
import { useEffect, useState } from "react";
import {
  TimeEntry,
  User,
  UserAndUnapprovedTimeEntriesType,
} from "../utilily/types";
import auth from "@react-native-firebase/auth";
import { TitleAndOnCheckAll } from "../components/TitleAndOnCheckAll";
import { useSuperAdminHomePageContext } from "../context/SuperAdminHomePageContext/useSuperAdminHomePageContext";
import { filter, groupBy } from "lodash";

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
  const context = useSuperAdminHomePageFunction();
  const { onApproveTimeEntries } = useSuperAdminHomePageContext();
  const allUsersWithUnconfirmedTimeEntries =
    context?.allUsersWithUnconfirmedTimeEntries ?? [];
  const [onCheck, setOnCheck] = useState<TimeEntry["id"][]>([]);
  const [allAdmins, setAllAdmins] = useState<
    Array<AdminWithUsersUnapprovedTimeEntriesType>
  >([]);

  const onApprove = () => {
    if (superAdminID !== undefined) onApproveTimeEntries(onCheck, superAdminID);
  };

  useEffect(() => {
    setOnCheck([]);
    setAllAdmins(prepareAdminArray(allUsersWithUnconfirmedTimeEntries));
  }, [allUsersWithUnconfirmedTimeEntries]);

  console.log(allUsersWithUnconfirmedTimeEntries.length);
  return (
    <SafeAreaView>
      <Menu />
      <TitleAndOnCheckAll
        onCheck={onCheck}
        allUsersWithUnconfirmedTimeEntries={allUsersWithUnconfirmedTimeEntries}
        setOnCheck={setOnCheck}
      />
      <ScrollView style={{ paddingHorizontal: 16 }}>
        {allAdmins.map((users, i) =>
          users.usersWithUnconfirmedTimeEntries.map(
            (user: UserAndUnapprovedTimeEntriesType, j) => (
              <UserAndUnapprovedTimeEntriesDropDown
                setOnCheck={setOnCheck}
                onCheck={onCheck}
                key={`${i}-${j}`}
                user={user}
              />
            ),
          ),
        )}
        <LongButton
          isDisabled={onCheck.length < 1}
          style={{ marginTop: 20 }}
          title="Godkänn"
          onPress={onApprove}
        />
        <BottomLogo />
      </ScrollView>
    </SafeAreaView>
  );
};
