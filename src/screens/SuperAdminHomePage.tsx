import { SafeAreaView } from "react-native-safe-area-context";
import Menu from "../components/Menu";
import BottomLogo from "../components/BottomLogo";
import { ScrollView, View } from "react-native";
import { UserAndUnapprovedTimeEntriesDropDown } from "../components/DropDowns/UserAndUnapprovedTimeEntriesDropDown";
import { useSuperAdminHomePageFunction } from "../context/SuperAdminHomePageContext";

export const SuperAdminHomePage = () => {
  const context = useSuperAdminHomePageFunction();
  const allUsersWithUnconfirmedTimeEntries =
    context?.allUsersWithUnconfirmedTimeEntries ?? [];

  return (
    <SafeAreaView>
      <Menu />
      <ScrollView style={{ paddingHorizontal: 16 }}>
        {allUsersWithUnconfirmedTimeEntries.map((user, i) => (
          <UserAndUnapprovedTimeEntriesDropDown key={i} user={user} />
        ))}
        <BottomLogo />
      </ScrollView>
    </SafeAreaView>
  );
};
