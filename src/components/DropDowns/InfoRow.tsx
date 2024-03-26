import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { Activity, TimeEntry, User } from "../../utility/types";
import colors from "../../assets/theme/colors";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Checkbox } from "../Checkbox";

type Props = {
  style?: StyleProp<ViewStyle>;
  mainTitle: string;
  date: TimeEntry["date"];
  time: TimeEntry["time"];
  checked?: boolean;
  onCheck?: () => void;
  testID?: string;
};

export const InfoRow = ({
  mainTitle,
  date,
  time,
  onCheck,
  checked,
  testID,
  style,
}: Props) => {
  return (
    <View style={[styles.container, style]}>
      <Text testID="info-row-title" style={styles.textName}>
        {mainTitle}
      </Text>
      <Text testID="info-row-date" style={{ flex: 0.5 }}>
        {date.toString()}
      </Text>
      <Text testID="info-row-time" style={{ flex: 0.22 }}>
        {`${time.toString()} h`}
      </Text>
      {checked !== undefined && onCheck && (
        <Checkbox
          testID={`info-row-${testID}`}
          onCheck={onCheck}
          checked={checked}
        />
      )}
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
