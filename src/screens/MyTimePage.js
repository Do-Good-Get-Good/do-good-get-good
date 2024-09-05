import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomLogo from "../components/BottomLogo";
import Menu from "../components/Menu";
import MyTimeEntries from "../components/MyTimeEntries";

export const MyTimePage = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Menu />
      <MyTimeEntries />
      <BottomLogo style={{ flex: 0.04 }} />
    </SafeAreaView>
  );
};
