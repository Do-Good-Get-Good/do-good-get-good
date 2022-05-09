import { StyleSheet, Text } from "react-native";
import React from "react";
import Menu from "../components/Menu";
import { SafeAreaView } from "react-native-safe-area-context";

const DownloadUserData = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Menu />
      <Text style={{ alignSelf: "center", marginTop: 16 }}>
        DownloadUserData
      </Text>
    </SafeAreaView>
  );
};

export default DownloadUserData;

const styles = StyleSheet.create({});
