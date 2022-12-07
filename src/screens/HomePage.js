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
          <>
            <MyActivities
              myAccumulatedTime={activity.activitiesIDandAccumTime}
              myActivities={activity.myActivities}
            />
            {timeEntries.length !== 0 && !isLoading && (
              <>
                <MyTimeEntries navigation={navigation} />
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
                    <View style={styles.viewAll}>
                      <Text style={styles.viewAllText}>Visa allt</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </>
            )}
          </>
        )}

        <Text style={styles.suggestionHeader}>Förslag & inspiration</Text>
        <SuggestionProvider>
          <Suggestions navigation={navigation} />
        </SuggestionProvider>

        {activity.myActivities.length !== 0 && (
          <MyTimeEntries navigation={navigation} />
        )}

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
  buttonBorderStyle: {
    borderRadius: 5,
    height: "100%",
    width: "100%",
    padding: 1,
  },
  viewAll: {
    letterSpacing: 1,
    backgroundColor: colors.light,
    width: "100%",
    height: "100%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  viewAllText: {
    ...typography.button.lg,
    fontWeight: "500",
    color: colors.dark,
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
