import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { Icon } from "react-native-elements";
import MenuOverlay from "./MenuOverlay";
import typography from "../assets/theme/typography";

const Menu = () => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerLogo}>
          <Image
            testID="dgggLogo"
            source={require("../img/Logotyp_DGGG.png")}
            style={styles.headerLogo}
          />
        </View>
        <Pressable
          testID="showOverlayButton"
          onPress={() => {
            toggleOverlay();
          }}
          style={styles.headerMenu}
        >
          <Icon
            name="menu"
            type="material"
            size={30}
            style={{ marginLeft: -7 }}
          />
          <Text style={styles.headerMenuText}>Meny</Text>
        </Pressable>
      </View>
      <MenuOverlay openOverlay={toggleOverlay} isVisible={visible} />
    </>
  );
};

export default Menu;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    height: 65,
  },
  headerLogo: {
    width: 75,
    height: 37,
  },
  headerMenu: {
    alignItems: "flex-start",
  },
  headerMenuText: {
    textTransform: "uppercase",
    fontFamily: typography.b2.fontFamily,
    fontSize: typography.b2.fontSize,
    marginTop: -7,
  },
});
