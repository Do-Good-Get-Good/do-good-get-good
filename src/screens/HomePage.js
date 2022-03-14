import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
} from "react-native";
import { MyActivities } from "../components/MyActivities";
import { MyActivityAsAList } from "../components/MyActivityAsAList";
import Suggestions from "../components/Suggestions";

import Menu from "../components/Menu";

import { useActivityFunction } from "../context/ActivityContext";
import { useAdminCheckFunction } from "../context/AdminContext";
import { SuggestionProvider } from "../context/SuggestionContext";
import FloatingActionButton from "../components/FloatingActionButton";
import ConfirmActivities from "../components/ConfirmActivities";
import TimeStatistics from "../components/TimeStatistics";
import MyUsers from "../components/MyUsers";
import BottomLogo from "../components/BottomLogo";
import typography from "../assets/theme/typography";

export const HomePage = ({ navigation }) => {
  const activity = useActivityFunction();
  const userLevel = useAdminCheckFunction();

  return (
    <SafeAreaView style={styles.view}>
      <Menu />
      {userLevel === "admin" ? (
        <>
          <ScrollView style={styles.container}>
            <ConfirmActivities />
            <MyUsers navigation={navigation} />
            <BottomLogo />
          </ScrollView>
          <FloatingActionButton />
        </>
      ) : null}
      {userLevel === "user" ? (
        <>
          {activity.myActivities.length != 0 ? (
            <View style={styles.view}>
              <ScrollView style={styles.container}>
                <TimeStatistics />
                <MyActivities
                  myAccumulatedTime={activity.activitiesIDandAccumTime}
                  myActivities={activity.myActivities}
                />
                <MyActivityAsAList navigation={navigation} />
                <SuggestionProvider>
                  <Text style={styles.suggestionHeader}>
                    Förslag & inspiration
                  </Text>
                  <Suggestions navigation={navigation} />
                </SuggestionProvider>
                <BottomLogo />
              </ScrollView>
            </View>
          ) : (
            <ScrollView style={styles.container}>
              <SuggestionProvider>
                <Text style={styles.suggestionHeader}>
                  Förslag & inspiration
                </Text>
                <Suggestions navigation={navigation} />
              </SuggestionProvider>
              <MyActivityAsAList navigation={navigation} />
            </ScrollView>
          )}
        </>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  view: {
    flex: 1,
    backgroundColor: "#F5F5F5",
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
