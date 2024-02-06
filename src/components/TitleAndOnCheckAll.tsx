import { Text } from "@rneui/base";
import { StyleSheet, View } from "react-native";
import typography from "../assets/theme/typography";

import { Checkbox } from "./Checkbox";
import { TimeEntry, UserAndUnapprovedTimeEntriesType } from "../utilily/types";
import { flatMap } from "lodash";
import { useCallback, useEffect, useState } from "react";

const title = "Icke godkänd";
const checkBoxText = "Markera alla";

type Props = {
  onCheck: Array<TimeEntry["id"]>;
  allUsersWithUnconfirmedTimeEntries: UserAndUnapprovedTimeEntriesType[];
  setOnCheck: (onCheck: Array<TimeEntry["id"]>) => void;
};

const allUnconfirmedTimeEntries = (
  users: UserAndUnapprovedTimeEntriesType[],
) => [
  ...flatMap(users, (u) => u.unapprovedTimeEntries.map((entry) => entry.id)),
];

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
        <Checkbox onCheck={onCheckAll} checked={isOnCheckAll()} />
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
