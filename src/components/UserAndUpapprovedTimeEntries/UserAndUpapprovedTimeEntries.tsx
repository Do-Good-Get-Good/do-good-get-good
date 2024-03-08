import { useState } from "react";
import {
  TimeEntry,
  User,
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
import { getUnconfirmedTimeEntriesFromAllUsersAdminPage } from "../TitleAndOnCheckAll/utility";

type Props = {
  users: User[];
  onApproveTimeEntriesAdmin: (onCheck: TimeEntry[]) => void;
};

export const UserAndUnapprovedTimeEntries = ({
  users,
  onApproveTimeEntriesAdmin,
}: Props) => {
  const [onCheck, setOnCheck] = useState<TimeEntry[]>([]);
  const onApprove = () =>
    AlertToApproveTimeEntries(() => onApproveTimeEntriesAdmin(onCheck));

  return (
    <>
      <TitleAndOnCheckAll
        onCheck={onCheck}
        allUnconfirmedTimeEntries={getUnconfirmedTimeEntriesFromAllUsersAdminPage(
          users,
        )}
        setOnCheck={setOnCheck}
      />
      {users.length > 0 ? (
        users?.map((user, i) => (
          <UserAndUnapprovedTimeEntriesRow
            key={user.id + i}
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
