import React from "react";
import { Image, Linking, StyleSheet, Text, View } from "react-native";
import DeviceInfo from "react-native-device-info";
import typography from "../../assets/theme/typography";
import BottomLogo from "../../components/BottomLogo";
import Menu from "../../components/Menu";

const AppIcon = require("../../assets/images/icon_dggg.png");

const About = () => {
  const { getVersion, getBuildNumber } = DeviceInfo;

  const email = "dggg@technogarden.se";

  const openMailClient = () => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <>
      <Menu />
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <Image testID="app-icon" style={styles.image} source={AppIcon} />
        </View>
        <Text style={styles.appName}>Do Good Get Good</Text>

        <Text style={styles.text}>
          Version: {getVersion()} ({getBuildNumber()})
        </Text>

        <View style={styles.contactInfo}>
          <Text style={typography.title.md}>Kontakt info</Text>

          <Text style={styles.text}>Mail:</Text>
          <Text
            style={[styles.text, { textDecorationLine: "underline" }]}
            onPress={openMailClient}
          >
            {email}
          </Text>
        </View>
        <BottomLogo />
      </View>
    </>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  appName: {
    ...typography.title.lg,
  },
  imageWrapper: {
    width: 150,
    height: 100,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  contactInfo: {
    marginTop: 32,
    alignItems: "center",
  },
  text: {
    ...typography.b2,
  },
});
