import React from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../assets/theme/colors";
import typography from "../../assets/theme/typography";
import BottomLogo from "../../components/BottomLogo";
import { Disclaimer } from "../../components/Disclaimer";
import HomeSuggestions from "../../components/HomeSuggestions";
import Menu from "../../components/Menu";
import { MyActivities } from "../../components/MyActivities";
import NewestTimeEntries from "../../components/NewestTimeEntries";
import TimeStatistics from "../../components/TimeStatistics";
import { useActivitySuggestions } from "../../hooks/useActivitySuggestions";
import { useLinkedActivities } from "../../hooks/useLinkedActivities";
import { useNotificationPermission } from "../../hooks/useNotificationPermission";
import { LinkedActivities, Props } from "./type";

export const HomePage = ({ navigation }: Props) => {
  const { timeObject, activities, isLoading }: LinkedActivities =
    useLinkedActivities();
  const { suggestions, loading } = useActivitySuggestions();
  useNotificationPermission();

  return (
    <SafeAreaView style={styles.view}>
      <Menu />
      <Disclaimer />
      <ScrollView style={styles.container}>
        {isLoading && <ActivityIndicator size={30} color={colors.primary} />}
        {activities.length !== 0 && timeObject.length !== 0 && (
          <>
            <TimeStatistics timeObject={timeObject} />
            <MyActivities
              activities={activities}
              registeredTime={timeObject[0].currentForMonth}
            />
            <NewestTimeEntries
              navigation={navigation}
              registeredTime={timeObject[0].currentForMonth}
            />
          </>
        )}

        <Text style={styles.suggestionHeader}>Förslag & inspiration</Text>
        {loading && (
          <ActivityIndicator
            size={30}
            color={colors.primary}
            style={{ marginTop: 10 }}
          />
        )}
        <HomeSuggestions suggestions={suggestions} />

        <BottomLogo />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
  },
  myActivities: {
    marginTop: 20,
  },
  suggestionHeader: {
    ...typography.title,
    marginTop: 16,
    marginBottom: -10,
  },
  logo: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    bottom: 0,
  },
});
