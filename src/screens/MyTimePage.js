import React from "react";
import { View, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import MyActivityAsAList from "../components/MyActivityAsAList";

import BottomLogo from "../components/BottomLogo";
import Menu from "../components/Menu";

export const MyTimePage = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Menu />

      <View style={styles.container}>
        <MyActivityAsAList />
        <BottomLogo />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
});
