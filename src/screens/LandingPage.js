import React, { useContext } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Button,
} from "react-native";
import { MyActivities } from "../components/MyActivities";
import { MyActivityAsAList } from "../components/MyActivityAsAList";
import { MyTime } from "../components/MyTime";
import { Suggestions } from "../components/Suggestions";
import UserContext from "../context/UserContext";
import { StatusBar } from "expo-status-bar";
import UserMenu from "../components/UserMenu";

export const LandingPage = ({ navigation }) => {
  const loggedInUser = useContext(UserContext);

  return (
    <SafeAreaView style={styles.view}>
      <StatusBar style="auto" />
      <UserMenu />
      <ScrollView>
        {/* <MyTime></MyTime> */}
        <MyActivities></MyActivities>
        <MyActivityAsAList navigation={navigation}></MyActivityAsAList>
        <Suggestions navigation={navigation}></Suggestions>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: "#F5F5F5",
  },
  myActivities: {
    flex: 1,
    marginTop: 20,
  },
});
