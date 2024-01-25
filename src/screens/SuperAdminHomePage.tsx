import { SafeAreaView } from "react-native-safe-area-context";
import Menu from "../components/Menu";
import BottomLogo from "../components/BottomLogo";
import { ScrollView, View } from "react-native";
import { UserAndUnapprovedTymeEntriesDropDown } from "../components/DropDowns/UserAndUnapprovedTymeEntriesDropDown";

export const SuperAdminHomePage = () => {
  const unapprovedTymeEntriesArr = [
    {
      activityID: "a1",

      timeEntryID: "t1",
      activityName: "activityName",
      date: new Date("Jan 18 2023"),
      time: 0.5,
    },

    {
      activityID: "a2",
      userID: "u1",
      timeEntryID: "t2",
      activityName: "title2",
      date: new Date("Jan 19 2023"),
      time: 0.5,
    },
  ];
  const userAndTimeEntriesArr = [
    {
      userID: "u1",
      userFirstName: "firstName",
      userLastName: "lastName",
      unapprovedTymeEntries: unapprovedTymeEntriesArr,
    },
    {
      userID: "u2",

      userFirstName: "firstName44444444444442",
      userLastName: "lastName2",
      unapprovedTymeEntries: unapprovedTymeEntriesArr,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Menu />
      <ScrollView style={{ paddingHorizontal: 16 }}>
        {userAndTimeEntriesArr.map((user) => (
          <UserAndUnapprovedTymeEntriesDropDown
            key={user.userID}
            userAndTimeEntry={user}
          />
        ))}
        <BottomLogo />
      </ScrollView>
    </SafeAreaView>
  );
};
