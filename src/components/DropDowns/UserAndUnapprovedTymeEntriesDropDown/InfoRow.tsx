import { StyleSheet, Text, View } from "react-native";
import { Activity, TimeEntry } from "../../../utilily/types";
import colors from "../../../assets/theme/colors";
import BouncyCheckbox from "react-native-bouncy-checkbox";

type Props = {
  activityName: Activity["title"];
  date: TimeEntry["date"];
  time: TimeEntry["time"];
  checked: boolean;
  onCheck: () => void;
};

export const InfoRow = ({
  activityName,
  date,
  time,
  onCheck,
  checked,
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textName}>{activityName}</Text>
      <Text style={{ flex: 0.5 }}>{date.toString()}</Text>
      <Text style={{ flex: 0.2 }}>{time}</Text>
      <BouncyCheckbox
        style={{ flex: 0.1 }}
        size={20}
        fillColor={colors.primary}
        unfillColor={colors.background}
        iconStyle={styles.iconStyle}
        innerIconStyle={styles.innerIconStyle}
        textStyle={{ fontFamily: "JosefinSans-Regular" }}
        isChecked={checked}
        onPress={onCheck}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",

    paddingHorizontal: 15,
    backgroundColor: colors.light,
    borderRadius: 5,
    paddingVertical: 10,
  },
  textName: { fontWeight: "bold", flex: 0.5 },
  iconStyle: {
    borderColor: colors.primary,
    borderRadius: 5,
  },
  innerIconStyle: { borderWidth: 0.7, borderRadius: 5 },
});
