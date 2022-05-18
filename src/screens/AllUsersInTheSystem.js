import { StyleSheet, ScrollView, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Menu from "../components/Menu";
import ListOfAllUsers from "../components/ListOfAllUsers";
function AllUsersInTheSystem({ navigation }) {
  return (
    <SafeAreaView style={styles.view}>
      <Menu />
      <ScrollView>
        <ListOfAllUsers />
      </ScrollView>
    </SafeAreaView>
  );
}
export default AllUsersInTheSystem;

const styles = StyleSheet.create({});
