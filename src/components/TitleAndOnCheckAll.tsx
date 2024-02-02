import { Text } from "@rneui/base";
import { StyleSheet, View } from "react-native";
import typography from "../assets/theme/typography";

import { Checkbox } from "./Checkbox";
import { TimeEntry, UserAndUnapprovedTimeEntriesType } from "../utilily/types";
import { flatMap } from "lodash";
import { useState } from "react";

const title = "Icke godkänd";
const checkBoxText = "Markera alla";

type Props = {
  allUsersWithUnconfirmedTimeEntries: UserAndUnapprovedTimeEntriesType[];
  setOnCheck: (onCheck: Array<TimeEntry["id"]>) => void;
};

export const TitleAndOnCheckAll = ({
  allUsersWithUnconfirmedTimeEntries,
  setOnCheck,
}: Props) => {
  const [isOnCheckAll, setisOnCheckAll] = useState(false);

  const onCheckAll = () => {
    setOnCheck(
      isOnCheckAll
        ? []
        : [
            ...flatMap(allUsersWithUnconfirmedTimeEntries, (u) =>
              u.unapprovedTimeEntries.map((entry) => entry.id),
            ),
          ],
    );
    setisOnCheckAll(!isOnCheckAll);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.checkBoxText}>{checkBoxText}</Text>
        <Checkbox onCheck={onCheckAll} checked={isOnCheckAll} />
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
