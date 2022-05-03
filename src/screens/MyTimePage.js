import React, { useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import MyActivityAsAList from "../components/MyActivityAsAList";
import { useActivityFunction } from "../context/ActivityContext";
import BottomLogo from "../components/BottomLogo";
import Menu from "../components/Menu";

export const MyTimePage = () => {
  const [makeScrolle, setMakeScrolle] = useState(false);
  const activityContext = useActivityFunction();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <SafeAreaView> */}
      <Menu />

      <View style={styles.container}>
        <MyActivityAsAList />
      </View>
      {/* <View
        style={{
          flex: 0.1,
          justifyContent: "flex-end",
          backgroundColor: "blue",
          marginBottom: 30,
        }}
      >
        <BottomLogo />
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,

    marginHorizontal: 16,
    marginBottom: 52,
  },
});
