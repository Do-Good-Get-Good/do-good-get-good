import { SafeAreaView } from "react-native-safe-area-context";
import Menu from "../components/Menu";
import BottomLogo from "../components/BottomLogo";
import { ScrollView, View } from "react-native";
import { UserAndUnapprovedTimeEntriesDropDown } from "../components/DropDowns/UserAndUnapprovedTimeEntriesDropDown";
import { useSuperAdminHomePageFunction } from "../context/SuperAdminHomePageContext";
import groupBy from "lodash/groupBy";
import { User, UserAndUnapprovedTimeEntriesType } from "../utilily/types";
import { useEffect, useState } from "react";

// const prepareAdminArray = (arr: UserAndUnapprovedTimeEntriesType[]) => {
//   const groupedByAdmin = groupBy(arr, (entry) => entry.adminID);
//   const result = Object.keys(groupedByAdmin).map((adminID) => ({
//     adminID,
//     usersWithUnconfirmedTimeEntries: groupedByAdmin[adminID],
//   }));

//   return result;
// };

const prepareAdminArray = (arr: UserAndUnapprovedTimeEntriesType[]) => {
  return arr.reduce((acc: AdminWithUsersUnapprovedTimeEntriesType[], curr) => {
    const adminIndex = acc.findIndex((admin) => admin.adminID === curr.adminID);

    if (adminIndex !== -1) {
      acc[adminIndex].usersWithUnconfirmedTimeEntries.push(curr);
    } else {
      acc.push({
        adminID: curr.adminID,
        usersWithUnconfirmedTimeEntries: [curr],
      });
    }

    return acc;
  }, []);
};

const countAllEntries = (
  usersWithUnconfirmedTimeEntries: UserAndUnapprovedTimeEntriesType[],
) =>
  usersWithUnconfirmedTimeEntries.reduce(
    (total, current) => total + current.unapprovedTimeEntries.length,
    0,
  );

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
    let f = prepareAdminArray(allUsersWithUnconfirmedTimeEntries);
    console.log(f, " .         -----     fffffff ");

    // setAllAdmins(prepareAdminArray(allUsersWithUnconfirmedTimeEntries));
  }, [allUsersWithUnconfirmedTimeEntries]);

  return (
    <SafeAreaView>
      <Menu />
      <ScrollView style={{ paddingHorizontal: 16 }}>
        {allAdmins.map((admin, j) =>
          admin.usersWithUnconfirmedTimeEntries.map(
            (user: UserAndUnapprovedTimeEntriesType, i) => (
              <UserAndUnapprovedTimeEntriesDropDown
                mainLableText={`${user.adminFirstName}\u00A0${user.adminLastName}`}
                amountOfTimeEntries={countAllEntries(
                  admin.usersWithUnconfirmedTimeEntries,
                )}
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
