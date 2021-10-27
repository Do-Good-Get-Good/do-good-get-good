import React, { useContext, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { MyActivities } from "../components/MyActivities";
import { MyActivityAsAList } from "../components/MyActivityAsAList";
// import { MyTime } from "../components/MyTime";
import { Suggestions } from "../components/Suggestions";

import Menu from "../components/Menu";

import { useActivityFunction } from "../context/ActivityContext";
import { useAdminCheckFunction } from "../context/AdminContext";
import { SuggestionProvider } from "../context/SuggestionContext";
import FloatingActionButton from "../components/FloatingActionButton";
import ConfirmActivities from "../components/ConfirmActivities";
import MyUsers from "../components/MyUsers";

export const HomePage = ({ navigation }) => {
  const activity = useActivityFunction();
  const userLevel = useAdminCheckFunction();

  return (
    <SafeAreaView style={styles.view}>
      <Menu />
      {userLevel === "admin" ? (
        <>
          <ScrollView style={styles.container}>
            <ConfirmActivities></ConfirmActivities>
            <MyUsers></MyUsers>
            <View style={styles.logo}>
              <Image
                source={require("../img/Technogarden-logotyp-Large.png")}
                style={{ width: 140, height: "55%" }}
              />
            </View>
          </ScrollView>
          <FloatingActionButton />
        </>
      ) : null}
      {userLevel === "user" ? (
        <>
          {activity.myActivities.length != 0 ? (
            <View style={styles.view}>
              <ScrollView style={styles.container}>
                <MyActivities
                  myAccumulatedTime={activity.activitiesIDandAccumTime}
                  myActivities={activity.myActivities}
                ></MyActivities>
                <MyActivityAsAList navigation={navigation}></MyActivityAsAList>
                <SuggestionProvider>
                  <Suggestions navigation={navigation}></Suggestions>
                </SuggestionProvider>
                <View style={styles.logo}>
                  <Image
                    source={require("../img/Technogarden-logotyp-Large.png")}
                    style={{ width: 140, height: "55%" }}
                  />
                </View>
              </ScrollView>
            </View>
          ) : (
            <ScrollView style={styles.container}>
              <SuggestionProvider>
                <Suggestions navigation={navigation}></Suggestions>
              </SuggestionProvider>
              <MyActivityAsAList navigation={navigation}></MyActivityAsAList>
            </ScrollView>
          )}
        </>
      ) : null}
      {/* <MyTime></MyTime> */}
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
  logo: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    // position: "absolute",
    bottom: 0,
  },
});
