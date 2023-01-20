import React, { useState, useEffect, useMemo } from "react";
import { Text, StyleSheet, View } from "react-native";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";
import InfoModal from "../components/InfoModal";
import { useTimeStatisticSettings } from "../context/TimeStatisticsContext";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { useRoute } from "@react-navigation/native";

export function TimeStatistics({ timeObject }) {
  const { maxConfirmedHours } = useTimeStatisticSettings();
  const route = useRoute();
  const [timeForYear, setTimeForYear] = useState(0.0);
  const [paidTime, setPaidTime] = useState(0.0);
  const [currentForMonth, setCurrentForMonth] = useState(0.0);

  const max = useMemo(() => {
    return route.name === "HomePage"
      ? maxConfirmedHours
      : maxConfirmedHours * 12;
  }, [maxConfirmedHours]);

  const month = format(new Date(), "MMMM", {
    locale: sv,
  });

  useEffect(() => {
    if (timeObject.length != 0) {
      setPaidTime(timeObject[0].paidTime);
      setTimeForYear(timeObject[0].timeForYear);
      setCurrentForMonth(timeObject[0].currentForMonth);
    }
  }, [timeObject]);

  const compensatedTime = () => {
    if (paidTime * 0.5 > max) return max;
    return paidTime * 0.5;
  };

  return (
    <>
      {route.name === "HomePage" && (
        <Text style={styles.header}>{`Timmar ${month}`}</Text>
      )}
      <View
        style={[
          styles.containerMonthAndPaidTime,
          route.name === "AdminPage" && { height: 115 },
        ]}
      >
        <View style={styles.innerContainerWrapper}>
          <Text testID="currentForMonth" style={styles.textH2ForTime}>
            {currentForMonth}
          </Text>
          <Text style={styles.textUnderForMonthAndPaidTime}>Registrerade</Text>
          {route.name === "AdminPage" && (
            <Text style={styles.textUnderForMonthAndPaidTime}>{month}</Text>
          )}
        </View>

        <View style={styles.line} />

        <View style={styles.innerContainerWrapper}>
          <Text testID="confirmedTime" style={styles.textH2ForTime}>
            {paidTime}
          </Text>
          <Text style={styles.textUnderForMonthAndPaidTime}>Godkända</Text>
          {route.name === "AdminPage" && (
            <Text style={styles.textUnderForMonthAndPaidTime}>
              {new Date().getFullYear()}
            </Text>
          )}
        </View>

        <View style={styles.line} />

        <View style={styles.innerContainerWrapper}>
          <Text testID="paidTime" style={styles.textH2ForTime}>
            {`${compensatedTime()} / ${max}`}
          </Text>
          <Text style={styles.textUnderForMonthAndPaidTime}>Ersatta</Text>
          {route.name === "AdminPage" && (
            <Text style={styles.textUnderForMonthAndPaidTime}>
              {new Date().getFullYear()}
            </Text>
          )}
        </View>
      </View>
      {route.name === "HomePage" && (
        <View style={styles.containerTextTimeForYearPopUp}>
          <Text testID="timeForYear">
            {`Timmar ersatta ${new Date().getFullYear()}: ${timeForYear}`}
          </Text>
          <InfoModal screen="homepage" tooltipWidth={250} />
        </View>
      )}
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
    paddingHorizontal: 5,
    height: 100,
    justifyContent: "space-evenly",
    position: "relative",
  },
  innerContainerWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textH2ForTime: {
    ...typography.h3,
    transform: [{ scale: 0.8 }],
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
