import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";

import { SafeAreaView } from "react-native-safe-area-context";

import { useActivityFunction } from "../context/ActivityContext";
import { SuggestionProvider } from "../context/SuggestionContext";

import Menu from "../components/Menu";
import { MyActivities } from "../components/MyActivities";
import MyTimeEntries from "../components/MyTimeEntries";
import { Suggestions } from "../components/Suggestions";
import TimeStatistics from "../components/TimeStatistics";
import BottomLogo from "../components/BottomLogo";

import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";

import NewestTimeEntries from "../components/NewestTimeEntries";

export const HomePage = ({ navigation }) => {
  const activity = useActivityFunction();

  return (
    <SafeAreaView style={styles.view}>
      <Menu />
      <ScrollView style={styles.container}>
        <TimeStatistics />
        {activity.myActivities.length !== 0 && (
          <>
            <MyActivities
              myAccumulatedTime={activity.activitiesIDandAccumTime}
              myActivities={activity.myActivities}
            />
            <NewestTimeEntries navigation={navigation} />
          </>
        )}

        <Text style={styles.suggestionHeader}>Förslag & inspiration</Text>
        <SuggestionProvider>
          <Suggestions navigation={navigation} />
        </SuggestionProvider>

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
