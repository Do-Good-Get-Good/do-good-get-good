import React from "react";
import { StyleSheet, ScrollView, Text } from "react-native";

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

export const HomePage = ({ navigation }) => {
  const activity = useActivityFunction();

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
            <MyActivityAsAList navigation={navigation} />
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
