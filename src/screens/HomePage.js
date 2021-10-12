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
import UserContext from "../context/UserContext";
// import { StatusBar } from 'expo-status-bar'
import UserMenu from "../components/UserMenu";
// import { SuggestionProvider } from '../context/SuggestionContext'

import { useActivityFunction } from "../context/ActivityContext";

export const HomePage = ({ navigation }) => {
  const activity = useActivityFunction();

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
      <UserMenu />
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
