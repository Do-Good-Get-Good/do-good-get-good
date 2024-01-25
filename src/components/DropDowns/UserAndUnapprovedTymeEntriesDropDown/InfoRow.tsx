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
      <Text style={{ flex: 0.8 }}>{date.toString()}</Text>
      <Text>{time}</Text>
      <BouncyCheckbox
        size={25}
        fillColor="red"
        unfillColor="#FFFFFF"
        iconStyle={{ borderColor: "red" }}
        innerIconStyle={{ borderWidth: 0.7, borderRadius: 5 }}
        textStyle={{ fontFamily: "JosefinSans-Regular" }}
        isChecked={checked}
        onPress={onCheck}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 15,
    backgroundColor: colors.light,
    borderRadius: 5,
    paddingVertical: 10,
  },
  textName: { fontWeight: "bold", flex: 1 },
  listItemCheckBoxStyle: {
    padding: 0,
    margin: 0,
  },
});
