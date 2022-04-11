import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";

import { useActivityFunction } from "../context/ActivityContext";
import { useAdminCheckFunction } from "../context/AdminContext";
import { SuggestionProvider } from "../context/SuggestionContext";
import { AdminHomePageProvider } from "../context/AdminHomePageContext";

import Menu from "../components/Menu";
import { MyActivities } from "../components/MyActivities";
import MyActivityAsAList from "../components/MyActivityAsAList";
import { Suggestions } from "../components/Suggestions";
import FloatingActionButton from "../components/FloatingActionButton";
import ConfirmActivities from "../components/ConfirmActivities";
import TimeStatistics from "../components/TimeStatistics";
import MyUsers from "../components/MyUsers";
import BottomLogo from "../components/BottomLogo";

import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";

export const HomePage = ({ navigation }) => {
  const activity = useActivityFunction();
  const userLevel = useAdminCheckFunction();

  return (
    <SafeAreaView style={styles.view}>
      <Menu />
      {userLevel === "admin" && (
        <>
          <ScrollView style={styles.container}>
            <AdminHomePageProvider>
              <ConfirmActivities />
              <MyUsers navigation={navigation} />
            </AdminHomePageProvider>
            <BottomLogo />
          </ScrollView>
          <FloatingActionButton />
        </>
      )}
      {userLevel === "user" && (
        <>
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
        </>
      )}
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
