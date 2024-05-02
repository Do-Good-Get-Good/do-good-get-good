import { useEffect, useState } from "react";
import { TimeEntry, User } from "../../../utility/types";
import { UserAndUnapprovedTimeEntriesRow } from "./UserAndUnapprovedTimeEntriesRow";
import { StyleSheet, Text } from "react-native";
import { textAllTimeEntriesApproved } from "./utility";
import typography from "../../../assets/theme/typography";
import colors from "../../../assets/theme/colors";
import { TitleAndOnCheckAll } from "../../TitleAndOnCheckAll";
import { LongButton } from "../../Buttons/LongButton";
import { AlertToApproveTimeEntries } from "../../Alerts/AlertToApproveTimeEntries";
import { getUnconfirmedTimeEntriesFromAllUsersAdminPage } from "../../TitleAndOnCheckAll/utility";

type Props = {
  loading: boolean;
  users: User[];
  onApproveTimeEntriesAdmin: (onCheck: TimeEntry[]) => Promise<void>;
};

export const UserAndUnapprovedTimeEntries = ({
  loading,
  users,
  onApproveTimeEntriesAdmin,
}: Props) => {
  const [onCheck, setOnCheck] = useState<TimeEntry[]>([]);

  useEffect(() => {
    if (users || loading) setOnCheck([]);
  }, [users, loading]);

  const onApprove = () =>
    AlertToApproveTimeEntries(() =>
      onApproveTimeEntriesAdmin(onCheck).then(() => setOnCheck([])),
    );

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
