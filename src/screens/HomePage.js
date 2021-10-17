import React, { useEffect } from "react";
import { Text, StyleSheet, SafeAreaView, View, ScrollView } from "react-native";
import { MyActivities } from "../components/MyActivities";
import { MyActivityAsAList } from "../components/MyActivityAsAList";
// import { MyTime } from "../components/MyTime";
import { Suggestions } from "../components/Suggestions";
// import { StatusBar } from 'expo-status-bar'
import Menu from "../components/Menu";

import { useActivityFunction } from "../context/ActivityContext";
import { useAdminCheckFunction } from "../context/AdminContext";
import FloatingActionButton from "../components/FloatingActionButton";

export const HomePage = ({ navigation }) => {
  const activity = useActivityFunction();
  const userLevel = useAdminCheckFunction();

  return (
    <SafeAreaView style={styles.view}>
      {/* <StatusBar style="auto" /> */}
      <Menu />
      <ScrollView>
        {userLevel === "admin" ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>I am logged in as an Admin!</Text>
          </View>
        ) : null}
        {userLevel === "user" ? (
          <>
            {activity.myActivities.length != 0 ? (
              <View style={styles.container}>
                <MyActivities
                  myAccumulatedTime={activity.activitiesIDandAccumTime}
                  myActivities={activity.myActivities}
                ></MyActivities>
                <MyActivityAsAList navigation={navigation}></MyActivityAsAList>
                <Suggestions navigation={navigation}></Suggestions>
              </View>
            ) : (
              <View style={styles.container}>
                <Suggestions navigation={navigation}></Suggestions>
                <MyActivityAsAList navigation={navigation}></MyActivityAsAList>
              </View>
            )}
          </>
        ) : null}
        {/* <MyTime></MyTime> */}
      </ScrollView>
      {userLevel === "admin" ? <FloatingActionButton /> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  view: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  myActivities: {
    flex: 1,
    marginTop: 20,
  },
});
