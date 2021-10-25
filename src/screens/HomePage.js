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
import { MyTime } from "../components/MyTime";
import { Suggestions } from "../components/Suggestions";

import Menu from "../components/Menu";
import { SuggestionProvider } from "../context/SuggestionContext";

import { useActivityFunction } from "../context/ActivityContext";

export const HomePage = ({ navigation }) => {
  const activity = useActivityFunction();

  return (
    <SafeAreaView style={styles.view}>
      <Menu />
      <ScrollView>
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

            <TouchableOpacity
              onPress={() => navigation.navigate("CreateActivity")}
            >
              <Text>"go to create activity"</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.container}>
            <SuggestionProvider>
              <Suggestions navigation={navigation}></Suggestions>
            </SuggestionProvider>
            <MyActivityAsAList navigation={navigation}></MyActivityAsAList>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  view: {
    backgroundColor: "#F5F5F5",
    marginBottom: 30,
  },
  myActivities: {
    flex: 1,
    marginTop: 20,
  },
});
