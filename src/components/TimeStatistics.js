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
      <Text style={styles.header}>Utförda timmar</Text>
      <View style={styles.containerMonthAndPaidTime}>
        <View style={styles.innerContainerWrapper}>
          <Text testID="currentForMonth" style={styles.textH2ForTime}>
            {currentForMonth}
          </Text>
          <Text style={styles.textUnderForMonthAndPaidTime}>Denna månad</Text>
        </View>

        <View style={styles.lineWrapper}>
          <View style={styles.line} />
        </View>

        <View style={styles.innerContainerWrapper}>
          <Text testID="paidTime" style={styles.textH2ForTime}>
            {paidTime} / 8
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
  header: {
    ...typography.title,
  },
  containerMonthAndPaidTime: {
    backgroundColor: colors.background,
    flexDirection: "row",
    paddingVertical: 20,
    justifyContent: "space-evenly",
    position: "relative",
  },
  innerContainerWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textH2ForTime: {
    ...typography.h2,
  },
  lineWrapper: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    paddingVertical: 20,
  },
  line: {
    width: 2.5,
    alignSelf: "center",
    height: "100%",
    backgroundColor: colors.primary,
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
