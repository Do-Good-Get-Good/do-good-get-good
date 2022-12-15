import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";
import InfoModal from "../components/InfoModal";

export function TimeStatistics({ timeObject }) {
  const [timeForYear, setTimeForYear] = useState(0.0);
  const [paidTime, setPaidTime] = useState(0.0);
  const [currentForMonth, setCurrentForMonth] = useState(0.0);

  useEffect(() => {
    if (timeObject.length != 0) {
      setPaidTime(timeObject[0].paidTime);
      setTimeForYear(timeObject[0].timeForYear);
      setCurrentForMonth(timeObject[0].currentForMonth);
    }
  }, [timeObject]);

  return (
    <>
      <Text style={styles.mainText}>Utförda timmar</Text>
      <View style={styles.containerMonthAndPaidTime}>
        <View style={styles.containerTimeAndTextUndre}>
          <Text testID="currentForMonth" style={styles.textH2ForTime}>
            {currentForMonth}
          </Text>
          <Text style={styles.textUnderForMonthAndPaidTime}>Denna månad</Text>
        </View>
        <View style={styles.lineBetween} />
        <View style={styles.containerTimeAndTextUndre}>
          <Text testID="paidTime" style={styles.textH2ForTime}>
            {paidTime}
          </Text>
          <Text style={styles.textUnderForMonthAndPaidTime}>
            Ersatta timmar
          </Text>
        </View>
      </View>
      <View style={styles.containerTextTimeForYearPopUp}>
        <Text testID="timeForYear">
          {`Totalt antal timmar i år: ${timeForYear}`}
        </Text>
        <InfoModal screen="homepage" tooltipWidth={250} />
      </View>
    </>
  );
}
export default TimeStatistics;
const styles = StyleSheet.create({
  mainText: {
    ...typography.title,
  },
  containerMonthAndPaidTime: {
    backgroundColor: colors.background,
    flexDirection: "row",
    paddingTop: 20,
    paddingBottom: 20,
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
  lineBetween: {
    backgroundColor: colors.primary,
    width: 2.5,
    height: "100%",
  },
  containerTextTimeForYearPopUp: {
    marginTop: 10,
    ...typography.b2,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.background,
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 5,
    paddingVertical: 5,
  },
});
