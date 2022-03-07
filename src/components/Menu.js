import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { Header } from "react-native-elements/dist/header/Header";
import { Icon } from "react-native-elements";
import MenuOverlay from "./MenuOverlay";
import { Platform } from "react-native";
import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";

const Menu = () => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View
      style={{
        ...Platform.select({
          ios: {
            marginTop: -50,
          },
          android: {
            marginTop: 0,
          },
        }),
      }}
    >
      <Header
        leftComponent={
          <Image
            testID="dgggLogo"
            source={require("../img/Logotyp_DGGG.png")}
            style={styles.headerLogo}
          />
        }
        rightComponent={
          <Pressable
            testID="showOverlayButton"
            onPress={() => {
              toggleOverlay();
            }}
          >
            <View style={styles.headerMenu}>
              <Icon
                name="menu"
                type="material"
                size={30}
                style={{ marginLeft: -7 }}
              />
              <Text style={styles.headerMenuText}>Meny</Text>
            </View>
          </Pressable>
        }
        barStyle="dark-content"
      />
      <MenuOverlay openOverlay={toggleOverlay} isVisible={visible} />
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  headerLogo: {
    width: 75,
    height: 37,
    marginLeft: 6,
  },
  headerMenu: {
    alignItems: "flex-start",
    marginRight: 8,
    marginTop: -3,
  },
  headerMenuText: {
    textTransform: "uppercase",
    fontFamily: typography.b2.fontFamily,
    fontSize: typography.b2.fontSize,
    marginTop: -7,
  },
});
