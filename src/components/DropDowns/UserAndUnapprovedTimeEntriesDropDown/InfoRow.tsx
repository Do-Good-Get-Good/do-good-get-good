import { StyleSheet, Text, View } from "react-native";
import { Activity, TimeEntry } from "../../../utilily/types";
import colors from "../../../assets/theme/colors";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Checkbox } from "../../Checkbox";

type Props = {
  activityTitle: Activity["title"];
  date: TimeEntry["date"];
  time: TimeEntry["time"];
  checked: boolean;
  onCheck: () => void;
};

export const InfoRow = ({
  activityTitle,
  date,
  time,
  onCheck,
  checked,
}: Props) => {
  return (
    <View style={styles.container}>
      <Text testID="info-row-title" style={styles.textName}>
        {activityTitle}
      </Text>
      <Text testID="info-row-date" style={{ flex: 0.5 }}>
        {date.toString()}
      </Text>
      <Text testID="info-row-time" style={{ flex: 0.2 }}>
        {time.toString()}
      </Text>
      <Checkbox onCheck={onCheck} checked={checked} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 15,
    backgroundColor: colors.light,
    paddingVertical: 10,
  },
  textName: { fontWeight: "bold", flex: 0.8 },
});
