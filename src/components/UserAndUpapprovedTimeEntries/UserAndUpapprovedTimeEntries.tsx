import { useState } from "react";
import { TimeEntry } from "../../utility/types";
import { UserAndUnapprovedTimeEntriesRow } from "./UserAndUnapprovedTimeEntriesRow";
import { useAdminFunction } from "../../context/AdminContext";
import { StyleSheet, Text } from "react-native";
import { textAllTimeEntriesApproved } from "./utility";
import typography from "../../assets/theme/typography";
import colors from "../../assets/theme/colors";
import { TitleAndOnCheckAll } from "../TitleAndOnCheckAll";

export const UserAndUnapprovedTimeEntries = () => {
  const [onCheck, setOnCheck] = useState<TimeEntry[]>([]);

  const { usersWithUnconfirmedTimeEntries } = useAdminFunction();

  return (
    <>
      <TitleAndOnCheckAll
        onCheck={onCheck}
        allUsersWithUnconfirmedTimeEntries={usersWithUnconfirmedTimeEntries}
        setOnCheck={setOnCheck}
      />
      {usersWithUnconfirmedTimeEntries.length > 0 ? (
        usersWithUnconfirmedTimeEntries?.map((user, i) => (
          <UserAndUnapprovedTimeEntriesRow
            key={user.userID + i}
            onCheck={onCheck}
            setOnCheck={setOnCheck}
            user={user}
          />
        ))
      ) : (
        <Text style={styles.allTimeEntriesApprovedStyle}>
          {textAllTimeEntriesApproved}
        </Text>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  allTimeEntriesApprovedStyle: {
    alignSelf: "center",
    ...typography.b2,
    color: colors.dark,
  },
});
