import { Text } from "@rneui/base";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import typography from "../../assets/theme/typography";
import { TimeEntry } from "../../utility/types";
import { Checkbox } from "../Checkbox";

const title = "Icke godkänd";
const checkBoxText = "Markera alla";

type Props = {
  onCheck: Array<TimeEntry>;
  allUnconfirmedTimeEntries: Array<TimeEntry>;
  setOnCheck: (onCheck: Array<TimeEntry>) => void;
};

export const TitleAndOnCheckAll = ({
  onCheck,
  allUnconfirmedTimeEntries,
  setOnCheck,
}: Props) => {
  const isOnCheckAll = useCallback(() => {
    return (
      onCheck.length === allUnconfirmedTimeEntries.length &&
      onCheck.length !== 0
    );
  }, [onCheck]);

  const onCheckAll = () => {
    setOnCheck(isOnCheckAll() ? [] : allUnconfirmedTimeEntries);
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
