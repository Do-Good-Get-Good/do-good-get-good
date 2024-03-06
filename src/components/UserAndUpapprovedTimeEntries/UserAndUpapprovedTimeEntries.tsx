import { useState } from "react";
import {
  TimeEntry,
  UserAndUnapprovedTimeEntriesType,
} from "../../utility/types";
import { UserAndUnapprovedTimeEntriesRow } from "./UserAndUnapprovedTimeEntriesRow";
import { useAdminFunction } from "../../context/AdminContext";
import { StyleSheet, Text } from "react-native";
import { textAllTimeEntriesApproved } from "./utility";
import typography from "../../assets/theme/typography";
import colors from "../../assets/theme/colors";
import { TitleAndOnCheckAll } from "../TitleAndOnCheckAll";
import { LongButton } from "../Buttons/LongButton";
import { AlertToApproveTimeEntries } from "../Alerts/AlertToApproveTimeEntries";
import { useAdminContext } from "../../context/AdminContext/useAdminContext";

type Props = {
  users: UserAndUnapprovedTimeEntriesType[];
};

export const UserAndUnapprovedTimeEntries = ({ users }: Props) => {
  const { onApproveTimeEntriesAdmin } = useAdminContext();
  const [onCheck, setOnCheck] = useState<TimeEntry[]>([]);
  const onApprove = () =>
    AlertToApproveTimeEntries(() => onApproveTimeEntriesAdmin(onCheck));

  return (
    <>
      <TitleAndOnCheckAll
        onCheck={onCheck}
        allUsersWithUnconfirmedTimeEntries={users}
        setOnCheck={setOnCheck}
      />
      {users.length > 0 ? (
        users?.map((user, i) => (
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
      <LongButton
        isDisabled={onCheck.length < 1}
        style={{ marginTop: 20 }}
        title="Godkänn"
        onPress={onApprove}
        testID="on-save"
      />
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
