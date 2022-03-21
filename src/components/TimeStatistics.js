import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";
import { useActivityFunction } from "../context/ActivityContext";
import InfoModal from "../components/InfoModal";

export function TimeStatistics({}) {
  let today = new Date();
  let currentYear = today.getFullYear();
  let currentMonth = today.getMonth();

  const activityContext = useActivityFunction();

  const [timeForYear, setTimeForYear] = useState(0.0);
  const [paidTime, setPaidTime] = useState(0.0);
  const [currentForMonth, setCurrentForMonth] = useState(0.0);

  useEffect(() => {
    if (activityContext.allListOfTimeEntry.length != 0) {
      let countTimeForThisMonth = 0.0;
      let countTimeForThisYear = 0.0;
      let countTimeForAllPaidTime = 0.0;
      for (let i = 0; i < activityContext.allListOfTimeEntry.length; i++) {
        if (
          activityContext.allListOfTimeEntry[i].date.toDate().getMonth() ===
          currentMonth
        ) {
          countTimeForThisMonth += activityContext.allListOfTimeEntry[i].time;
        }

        if (
          activityContext.allListOfTimeEntry[i].date.toDate().getFullYear() ===
          currentYear
        ) {
          countTimeForThisYear += activityContext.allListOfTimeEntry[i].time;
        }
        if (activityContext.allListOfTimeEntry[i].statusConfirmed === true) {
          countTimeForAllPaidTime += activityContext.allListOfTimeEntry[i].time;
        }
      }
      setCurrentForMonth(countTimeForThisMonth);
      setTimeForYear(countTimeForThisYear);
      setPaidTime(countTimeForAllPaidTime);
    }
  }, [activityContext.allListOfTimeEntry]);

  return (
    <View style={styles.containerForAll}>
      <Text style={styles.mainText}>Utförda timmar</Text>
      <View style={styles.containerMonthAndPaidTime}>
        <View style={styles.containerTimeAndTextUndre}>
          <Text testID="currentForMonth" style={styles.textH2ForTime}>
            {currentForMonth}
          </Text>
          <Text style={styles.textUnderForMonthAndPaidTime}>Denna månad</Text>
        </View>
        <Text style={styles.lineBetween}></Text>
        <View style={styles.containerTimeAndTextUndre}>
          <Text testID="paidTime" style={styles.textH2ForTime}>
            {paidTime}
          </Text>
          <Text style={styles.textUnderForMonthAndPaidTime}>
            Ersatta timmar
          </Text>
        </View>
      </View>
      <View>
        <View style={styles.containerTextTimeForYearPopUp}>
          <Text testID="timeForYear">
            Totall antal timmar i år: {timeForYear}
          </Text>
          <InfoModal screen="homepage" tooltipWidth={250} />
        </View>
      </View>
    </View>
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
    backgroundColor: colors.background,
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
  lineBetween: {
    backgroundColor: colors.primary,
    paddingHorizontal: 1.3,
  },
  containerTextTimeForYearPopUp: {
    marginTop: 13,
    ...typography.b2,
    justifyContent: "space-between",
    backgroundColor: colors.background,
    flexDirection: "row",
    paddingLeft: 13,
    paddingRight: 3,
  },
});
