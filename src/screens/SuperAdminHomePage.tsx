import { SafeAreaView } from "react-native-safe-area-context";
import Menu from "../components/Menu";
import BottomLogo from "../components/BottomLogo";
import { ScrollView, View } from "react-native";
import { UserAndUnapprovedTimeEntriesDropDown } from "../components/DropDowns/UserAndUnapprovedTimeEntriesDropDown";
import { useSuperAdminHomePageFunction } from "../context/SuperAdminHomePageContext";
import { LongButton } from "../components/Buttons/LongButton";
import { useState } from "react";
import { TimeEntry } from "../utilily/types";
import auth from "@react-native-firebase/auth";
import { TitleAndOnCheckAll } from "../components/TitleAndOnCheckAll";

export const SuperAdminHomePage = () => {
  const context = useSuperAdminHomePageFunction();
  const allUsersWithUnconfirmedTimeEntries =
    context?.allUsersWithUnconfirmedTimeEntries ?? [];
  const [onCheck, setOnCheck] = useState<TimeEntry["id"][]>([]);
  const superAdminID = auth()?.currentUser?.uid;

  const onApprove = () => {
    if (superAdminID !== undefined)
      context?.onApproveTimeEntries(onCheck, superAdminID);
  };

  return (
    <SafeAreaView>
      <Menu />
      <TitleAndOnCheckAll
        allUsersWithUnconfirmedTimeEntries={allUsersWithUnconfirmedTimeEntries}
        setOnCheck={setOnCheck}
      />
      <ScrollView style={{ paddingHorizontal: 16 }}>
        {allUsersWithUnconfirmedTimeEntries.map((user, i) => (
          <UserAndUnapprovedTimeEntriesDropDown
            setOnCheck={setOnCheck}
            onCheck={onCheck}
            key={i}
            user={user}
          />
        ))}
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
