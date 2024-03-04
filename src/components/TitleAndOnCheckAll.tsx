import { Text } from "@rneui/base";
import { StyleSheet, View } from "react-native";
import typography from "../assets/theme/typography";

import { Checkbox } from "./Checkbox";
import { TimeEntry, UserAndUnapprovedTimeEntriesType } from "../utility/types";
import flatMap from "lodash/flatMap";
import { useCallback } from "react";

const title = "Icke godkänd";
const checkBoxText = "Markera alla";

type Props = {
  onCheck: Array<TimeEntry>;
  allUsersWithUnconfirmedTimeEntries: UserAndUnapprovedTimeEntriesType[];
  setOnCheck: (onCheck: Array<TimeEntry>) => void;
};

const allUnconfirmedTimeEntries = (
  users: UserAndUnapprovedTimeEntriesType[],
) => [...flatMap(users, (u) => u.unapprovedTimeEntries.map((entry) => entry))];

export const TitleAndOnCheckAll = ({
  onCheck,
  allUsersWithUnconfirmedTimeEntries,
  setOnCheck,
}: Props) => {
  const isOnCheckAll = useCallback(() => {
    return (
      onCheck.length ===
        allUnconfirmedTimeEntries(allUsersWithUnconfirmedTimeEntries).length &&
      onCheck.length !== 0
    );
  }, [onCheck]);

  const onCheckAll = () => {
    setOnCheck(
      isOnCheckAll()
        ? []
        : allUnconfirmedTimeEntries(allUsersWithUnconfirmedTimeEntries),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.checkBoxText}>{checkBoxText}</Text>
        <Checkbox
          testID={"on-check-all"}
          onCheck={onCheckAll}
          checked={isOnCheckAll()}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  title: {
    ...typography.title,
  },
  checkBoxText: {
    ...typography.b2,
    marginRight: 10,
  },
});
