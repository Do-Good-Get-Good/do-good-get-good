import React, { useState } from "react";
import { StyleSheet, ScrollView, Text, TouchableOpacity } from "react-native";

import LinearGradient from "react-native-linear-gradient";

import { SafeAreaView } from "react-native-safe-area-context";

import { useActivityFunction } from "../context/ActivityContext";
import { SuggestionProvider } from "../context/SuggestionContext";

import Menu from "../components/Menu";
import { MyActivities } from "../components/MyActivities";
import MyActivityAsAList from "../components/MyActivityAsAList";
import { Suggestions } from "../components/Suggestions";
import TimeStatistics from "../components/TimeStatistics";
import BottomLogo from "../components/BottomLogo";

import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";

import useTimeEntries from "../customFirebaseHooks/useTimeEntries";
import TimeEntry from "../components/TimeEntry";

export const HomePage = ({ navigation }) => {
  const activity = useActivityFunction();
  const { timeEntries, isLoading, error } = useTimeEntries(5);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <SafeAreaView style={styles.view}>
      <Menu />
      <ScrollView style={styles.container}>
        <TimeStatistics />
        {activity.myActivities.length != 0 && (
          <MyActivities
            myAccumulatedTime={activity.activitiesIDandAccumTime}
            myActivities={activity.myActivities}
          />
        )}

        {timeEntries.length !== 0 && !isLoading && (
          <>
            {timeEntries.map((entry) => (
              <TimeEntry entry={entry} key={entry.id} index={0} />
            ))}
            <TouchableOpacity
              style={{ width: "50%", height: 55, marginTop: 12 }}
              testID="showAllButton"
              onPress={() => navigation.navigate("MyTimePage")}
            >
              <LinearGradient
                colors={[colors.primary, colors.secondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonBorderStyle}
              >
                <Text style={styles.textVissaAll}>Visa allt</Text>
              </LinearGradient>
            </TouchableOpacity>
          </>
        )}

        <Text style={styles.suggestionHeader}>Förslag & inspiration</Text>
        <SuggestionProvider>
          <Suggestions navigation={navigation} />
        </SuggestionProvider>

        {activity.myActivities.length === 0 && (
          <MyActivityAsAList navigation={navigation} />
        )}

        <BottomLogo />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: colors.light,
  },
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  myActivities: {
    flex: 1,
    marginTop: 20,
  },
  buttonBorderStyle: {
    borderRadius: 5,
    height: "100%",
    width: "100%",
    padding: 1,
  },
  textVissaAll: {
    letterSpacing: 1,
    backgroundColor: colors.light,
    width: "100%",
    height: "100%",
    borderRadius: 5,
    ...typography.button.lg,
    fontWeight: "500",
    color: colors.dark,
    textAlign: "center",
    textAlignVertical: "center",
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
