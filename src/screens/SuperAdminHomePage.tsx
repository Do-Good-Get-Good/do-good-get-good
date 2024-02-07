import { SafeAreaView } from "react-native-safe-area-context";
import Menu from "../components/Menu";
import BottomLogo from "../components/BottomLogo";
import { ScrollView, View } from "react-native";
import { UserAndUnapprovedTimeEntriesDropDown } from "../components/DropDowns/UserAndUnapprovedTimeEntriesDropDown";
import { useSuperAdminHomePageFunction } from "../context/SuperAdminHomePageContext";
import groupBy from "lodash/groupBy";
import { User, UserAndUnapprovedTimeEntriesType } from "../utilily/types";
import { useEffect, useState } from "react";

const prepareAdminArray = (arr: UserAndUnapprovedTimeEntriesType[]) => {
  const groupedByAdmin = groupBy(arr, (entry) => entry.adminID);
  const result = Object.keys(groupedByAdmin).map((adminID) => ({
    adminID,
    usersWithUnconfirmedTimeEntries: groupedByAdmin[adminID],
  }));

  return result;
};

const countAllEntries = (
  usersWithUnconfirmedTimeEntries: UserAndUnapprovedTimeEntriesType[],
) => {};

type AdminWithUsersUnapprovedTimeEntriesType = {
  adminID: User["adminID"];
  usersWithUnconfirmedTimeEntries: UserAndUnapprovedTimeEntriesType[];
};

export const SuperAdminHomePage = () => {
  const context = useSuperAdminHomePageFunction();
  const allUsersWithUnconfirmedTimeEntries =
    context?.allUsersWithUnconfirmedTimeEntries ?? [];
  const [allAdmins, setAllAdmins] = useState<
    Array<AdminWithUsersUnapprovedTimeEntriesType>
  >([]);

  useEffect(() => {
    setAllAdmins(prepareAdminArray(allUsersWithUnconfirmedTimeEntries));
  }, [allUsersWithUnconfirmedTimeEntries]);

  return (
    <SafeAreaView>
      <Menu />
      <ScrollView style={{ paddingHorizontal: 16 }}>
        {allAdmins.map((users, i) =>
          users.usersWithUnconfirmedTimeEntries.map(
            (user: UserAndUnapprovedTimeEntriesType, j) => (
              <UserAndUnapprovedTimeEntriesDropDown
                key={`${i}-${j}`}
                user={user}
              />
            ),
          ),
        )}

        <BottomLogo />
      </ScrollView>
    </SafeAreaView>
  );
};
