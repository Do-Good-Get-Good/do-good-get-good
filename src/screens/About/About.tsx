import React from "react";
import { StyleSheet, Text, View } from "react-native";
import DeviceInfo from "react-native-device-info";
import Menu from "../../components/Menu";

const About = () => {
  const { getVersion, getBuildNumber } = DeviceInfo;

  return (
    <View>
      <Menu />
      <Text>Om appen</Text>
      <Text>App version: {getVersion()}</Text>
      <Text>Byggnummer: {getBuildNumber()}</Text>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({});
