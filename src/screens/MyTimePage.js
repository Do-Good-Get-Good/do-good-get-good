import React from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";

import auth from "@react-native-firebase/auth";

import { MyActivityAsAList } from "../components/MyActivityAsAList";
import { useActivityFunction } from "../context/ActivityContext";
import Menu from "../components/Menu";

export const MyTimePage = ({ navigation }) => {
  const listOfAllTimeEntry = useActivityFunction();

  return (
    <SafeAreaView>
      <Menu />
      <ScrollView>
        <View style={styles.container}>
          <MyActivityAsAList
            showAllList={listOfAllTimeEntry.allListOfTimeEntry}
          ></MyActivityAsAList>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
});
