import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, View, ScrollView, Text } from "react-native";

import { useActivityFunction } from "../context/ActivityContext";
import { useAdminCheckFunction } from "../context/AdminContext";
import { SuggestionProvider } from "../context/SuggestionContext";

import Menu from "../components/Menu";
import { MyActivities } from "../components/MyActivities";
import { MyActivityAsAList } from "../components/MyActivityAsAList";
import { Suggestions } from "../components/Suggestions";
import FloatingActionButton from "../components/FloatingActionButton";
import ConfirmActivities from "../components/ConfirmActivities";
import TimeStatistics from "../components/TimeStatistics";
import MyUsers from "../components/MyUsers";
import BottomLogo from "../components/BottomLogo";

import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";

import auth from "@react-native-firebase/auth";
import { useAllUserData } from "../customFirebaseHooks/useAllUserData";

export const HomePage = ({ navigation }) => {
  const activity = useActivityFunction();
  const userLevel = useAdminCheckFunction();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      let data = await useAllUserData(auth().currentUser.uid);
      setUserData(data);
    };
    if (userLevel === "admin") {
      fetchUserData();
    }
  }, [userLevel]);

  useEffect(() => {
    if (userData != null) {
      console.log("HOMEPAGE - UserData: ", userData);
    }
  }, [userData]);

  return (
    <SafeAreaView style={styles.view}>
      <Menu />
      {userLevel === "admin" && (
        <>
          <ScrollView style={styles.container}>
            <ConfirmActivities userData={userData} />
            <MyUsers navigation={navigation} usersData={userData} />
            <BottomLogo />
          </ScrollView>
          <FloatingActionButton />
        </>
      )}
      {userLevel === "user" && (
        <>
          {activity.myActivities.length != 0 && (
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
          )}
          {activity.activitiesIDandAccumTime.length < 1 && (
            <ScrollView style={styles.container}>
              <SuggestionProvider>
                <Text style={styles.suggestionHeader}>
                  Förslag & inspiration
                </Text>
                <Suggestions navigation={navigation} />
              </SuggestionProvider>
              <MyActivityAsAList navigation={navigation} />
              <BottomLogo />
            </ScrollView>
          )}
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
