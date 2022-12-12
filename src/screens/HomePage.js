import React from "react";
import { StyleSheet, ScrollView, Text } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { SuggestionProvider } from "../context/SuggestionContext";

import Menu from "../components/Menu";
import TimeStatistics from "../components/TimeStatistics";
import { MyActivities } from "../components/MyActivities";
import NewestTimeEntries from "../components/NewestTimeEntries";
import { Suggestions } from "../components/Suggestions";
import BottomLogo from "../components/BottomLogo";

import typography from "../assets/theme/typography";

import useLinkedActivities from "../customFirebaseHooks/useLinkedActivities";

export const HomePage = ({ navigation }) => {
  const { timeObject, activities } = useLinkedActivities();

  return (
    <SafeAreaView style={styles.view}>
      <Menu />
      <ScrollView style={styles.container}>
        {activities.length !== 0 && timeObject.length !== 0 && (
          <>
            <TimeStatistics timeObject={timeObject} />
            <MyActivities activities={activities} />
          </>
        )}
        <NewestTimeEntries navigation={navigation} />
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
