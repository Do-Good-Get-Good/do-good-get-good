import React, { useContext, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { MyActivities } from "../components/MyActivities";
import { MyActivityAsAList } from "../components/MyActivityAsAList";
// import { MyTime } from "../components/MyTime";
import { Suggestions } from "../components/Suggestions";

import Menu from "../components/Menu";

import { useActivityFunction } from "../context/ActivityContext";
import { useAdminCheckFunction } from "../context/AdminContext";
import FloatingActionButton from "../components/FloatingActionButton";
import ConfirmActivities from "../components/ConfirmActivities";

export const HomePage = ({ navigation }) => {
  const activity = useActivityFunction();
  const userLevel = useAdminCheckFunction();

  return (
    <SafeAreaView style={styles.view}>
      <Menu />
      <ScrollView>
        {userLevel === "admin" ? (
          <View style={styles.container}>
            <ConfirmActivities></ConfirmActivities>

            <TouchableOpacity
              onPress={() => navigation.navigate("CreateActivity")}
            >
              <Text>"go to create activity"</Text>
            </TouchableOpacity>
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
                <SuggestionProvider>
                  <Suggestions navigation={navigation}></Suggestions>
                </SuggestionProvider>

                {/* <MyActivities
                  myAccumulatedTime={activity.activitiesIDandAccumTime}
                  myActivities={activity.myActivities}
                ></MyActivities>
                <MyActivityAsAList navigation={navigation}></MyActivityAsAList>
                <Suggestions navigation={navigation}></Suggestions> */}
              </View>
            ) : (
              <View style={styles.container}>
                <SuggestionProvider>
                  <Suggestions navigation={navigation}></Suggestions>
                </SuggestionProvider>
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
