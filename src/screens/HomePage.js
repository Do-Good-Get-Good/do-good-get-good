import React, { useEffect } from "react";
import { StyleSheet, ScrollView, Text, ActivityIndicator } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import Menu from "../components/Menu";
import TimeStatistics from "../components/TimeStatistics";
import { MyActivities } from "../components/MyActivities";
import NewestTimeEntries from "../components/NewestTimeEntries";
import HomeSuggestions from "../components/HomeSuggestions";
import BottomLogo from "../components/BottomLogo";

import typography from "../assets/theme/typography";

import useLinkedActivities from "../hooks/useLinkedActivities";
import { useActivitySuggestions } from "../hooks/useActivitySuggestions";
import colors from "../assets/theme/colors";

export const HomePage = ({ navigation }) => {
  const { timeObject, activities, isLoading } = useLinkedActivities();
  const { suggestions, loading } = useActivitySuggestions();

  return (
    <SafeAreaView style={styles.view}>
      <Menu />
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
        <HomeSuggestions suggestions={suggestions} navigation={navigation} />

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
