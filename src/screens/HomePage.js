import React, { useContext, useState } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Button,
  Platform,
} from "react-native";
import { MyActivities } from "../components/MyActivities";
import { MyActivityAsAList } from "../components/MyActivityAsAList";
import { MyTime } from "../components/MyTime";
import { Suggestions } from "../components/Suggestions";
// import { StatusBar } from 'expo-status-bar'
import Menu from "../components/Menu";
// import { SuggestionProvider } from '../context/SuggestionContext'

import { useActivityFunction } from "../context/ActivityContext";
import { useAdminCheckFunction } from "../context/AdminContext";
import FloatingActionButton from "../components/FloatingActionButton";

export const HomePage = ({ navigation }) => {
  const activity = useActivityFunction();
  const isAdmin = useAdminCheckFunction();

  // const [activity, setA] = useState([1, 3])
  // console.log('USER HOME PAGE myActivities', activity.myActivities)
  // console.log(
  //   'USER HOME PAGE activitiesIDandAccumTime',
  //   activity.activitiesIDandAccumTime
  // )

  // const [activityIsFull, setActivityIsFull] = useState(true)
  // console.log('suggestionsFromFirebaseActive  activeArray ', r.activeArray)
  // console.log('suggestionsFromFirebaseActive  InactiveArray', r.InactiveArray)
  // console.log('r.InactiveArray.length  InactiveArray', r.InactiveArray.length)

  return (
    <SafeAreaView style={styles.view}>
      {/* <StatusBar style="auto" /> */}
      <Menu />
      <ScrollView>
        {activity.myActivities.length != 0 ? (
          <View style={styles.container}>
            <MyActivities
              myAccumulatedTime={activity.activitiesIDandAccumTime}
              myActivities={activity.myActivities}
            ></MyActivities>
            <MyActivityAsAList navigation={navigation}></MyActivityAsAList>
            {/* <SuggestionProvider>
              <Suggestions navigation={navigation}></Suggestions>
            </SuggestionProvider> */}
          </View>
        ) : (
          <View style={styles.container}>
            {/* <SuggestionProvider>
              <Suggestions navigation={navigation}></Suggestions>
            </SuggestionProvider> */}
            <MyActivityAsAList navigation={navigation}></MyActivityAsAList>
          </View>
        )}
        {/* <MyTime></MyTime> */}
      </ScrollView>
      {isAdmin ? <FloatingActionButton /> : null}
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
