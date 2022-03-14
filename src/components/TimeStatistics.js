import React, { useState, useEffect } from "react";
import { Text, StyleSheet, SafeAreaView, View } from "react-native";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

export function TimeStatistics({}) {
  const today = new Date();

  const [timeForYear, setTimeForYear] = useState(13.5);
  const [timeForCurrentMonth, setTimeForCurrentMonth] = useState(6.0);
  const [paidTime, setPaidTime] = useState(3.5);

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(30);
  //today.toLocaleString("default", { month: "long" })

  return (
    <SafeAreaView>
      <View style={styles.containerForAll}>
        <Text style={styles.mainText}>Utförda timmar</Text>
        <View style={styles.containerMonthAndPaidTime}>
          <View style={styles.containerTimeAndTextUndre}>
            <Text style={styles.textH2ForTime}>{currentMonth}</Text>
            <Text style={styles.textUnderForMonthAndPaidTime}>Denna månad</Text>
          </View>
          <Text style={styles.lineBetween}></Text>
          <View style={styles.containerTimeAndTextUndre}>
            <Text style={styles.textH2ForTime}>{paidTime}</Text>
            <Text style={styles.textUnderForMonthAndPaidTime}>
              Ersatta timmar
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.containerTextTimeForYearPopUp}>
            <Text>Totall antal timmar i år: {timeForYear}</Text>
            <TouchableOpacity>
              <Icon
                type="material-community"
                name="information-outline"
                color={colors.dark}
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default TimeStatistics;
const styles = StyleSheet.create({
  containerForAll: {
    flex: 1,
    color: colors.dark,
  },
  mainText: {
    ...typography.title,
  },
  containerMonthAndPaidTime: {
    backgroundColor: "white",
    flexDirection: "row",
    paddingTop: 19,
    paddingBottom: 16,

    justifyContent: "space-evenly",
  },
  textH2ForTime: {
    ...typography.h2,

    alignSelf: "center",
    justifyContent: "center",
  },
  containerTimeAndTextUndre: {
    justifyContent: "center",
  },
  textUnderForMonthAndPaidTime: {},
  lineBetween: {
    backgroundColor: colors.primary,
    paddingHorizontal: 1.3,
  },
  containerTextTimeForYearPopUp: {
    marginTop: 13,
    ...typography.b2,
    justifyContent: "space-between",
    backgroundColor: "white",
    flexDirection: "row",
    paddingLeft: 13,
    paddingRight: 3,
  },
});
