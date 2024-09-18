import { useRoute } from "@react-navigation/native";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";
import InfoModal from "../components/InfoModal";
import { useTimeStatisticSettings } from "../context/TimeStatisticsContext";
import { Routes } from "../lib/enums/routes";

function TimeStatistics({ timeObject }) {
  const { maxConfirmedHours } = useTimeStatisticSettings();
  const route = useRoute();
  const [timeForYear, setTimeForYear] = useState(0.0);
  const [paidTime, setPaidTime] = useState(0.0);
  const [currentForMonth, setCurrentForMonth] = useState(0.0);

  const month = format(new Date(), "MMMM", {
    locale: sv,
  });

  useEffect(() => {
    if (timeObject.length !== 0) {
      setPaidTime(timeObject[0].paidTime);
      setTimeForYear(timeObject[0].timeForYear);
      setCurrentForMonth(timeObject[0].currentForMonth);
    }
  }, [timeObject]);

  const compensatedTimeUser = () => {
    if (timeForYear * 0.5 > maxConfirmedHours) return maxConfirmedHours;
    return timeForYear * 0.5;
  };
  const compensatedTimeAdmin = () => {
    if (paidTime * 0.5 > maxConfirmedHours) return maxConfirmedHours;
    return paidTime * 0.5;
  };

  const compensatedTime = () => {
    if (route.name === Routes.HomePage) return compensatedTimeUser();
    else return compensatedTimeAdmin();
  };

  return (
    <>
      {route.name === Routes.HomePage && (
        <Text style={styles.header}>{`Timmar ${month}`}</Text>
      )}
      <View
        style={[
          styles.containerMonthAndPaidTime,
          route.name === Routes.AdminPage && { height: 115 },
        ]}
      >
        <View style={styles.innerContainerWrapper}>
          <Text testID="currentForMonth" style={styles.textH2ForTime}>
            {currentForMonth}
          </Text>
          <Text style={styles.textUnderForMonthAndPaidTime}>Registrerade</Text>
          {route.name === Routes.AdminPage && (
            <Text style={styles.textUnderForMonthAndPaidTime}>{month}</Text>
          )}
        </View>

        <View style={styles.line} />

        <View style={styles.innerContainerWrapper}>
          <Text testID="confirmedTime" style={styles.textH2ForTime}>
            {paidTime}
          </Text>
          <Text style={styles.textUnderForMonthAndPaidTime}>Godkända</Text>
          {route.name === Routes.AdminPage && (
            <Text style={styles.textUnderForMonthAndPaidTime}>
              {new Date().getFullYear()}
            </Text>
          )}
        </View>

        <View style={styles.line} />

        <View style={styles.innerContainerWrapper}>
          <Text testID="paidTime" style={styles.textH2ForTime}>
            {`${compensatedTime()} / ${maxConfirmedHours}`}
          </Text>
          {route.name === Routes.HomePage && (
            <Text style={styles.textUnderForMonthAndPaidTime}>
              Ersatta {new Date().getFullYear()}
            </Text>
          )}
          {route.name === Routes.AdminPage && (
            <>
              <Text style={styles.textUnderForMonthAndPaidTime}>Ersatta</Text>
              <Text style={styles.textUnderForMonthAndPaidTime}>
                {new Date().getFullYear()}
              </Text>
            </>
          )}
        </View>
      </View>
      {route.name === Routes.HomePage && (
        <View style={styles.containerTextTimeForYearPopUp}>
          <Text testID="timeForYear">
            {`Timmar godkända ${new Date().getFullYear()}: ${timeForYear}`}
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
