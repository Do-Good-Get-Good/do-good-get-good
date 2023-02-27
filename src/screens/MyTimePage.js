import React from "react";
import { View, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import MyTimeEntries from "../components/MyTimeEntries";

import BottomLogo from "../components/BottomLogo";
import Menu from "../components/Menu";

export const MyTimePage = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Menu />

      <View style={styles.container}>
        <MyTimeEntries />
        <BottomLogo />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    justifyContent: "space-between",
  },
});
