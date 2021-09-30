import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { Header } from "react-native-elements/dist/header/Header";
import { Icon } from "react-native-elements";
import MenuOverlay from "./MenuOverlay";
import { Platform } from "react-native";

const UserMenu = () => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View 
      style={{
        ...Platform.select({
          ios: {
            marginTop: -50
          },
          android: {
            marginTop: 0
          }
        })
      }}
    >
      <Header
        leftComponent={
          <Image
            source={require("../img/Logo-DGGG-13.png")}
            style={styles.headerLogo}
          />
        }
        rightComponent={
          <Pressable
            onPress={() => {
              toggleOverlay();
            }}
          >
            <View style={styles.headerMenu}>
              <Icon name="menu" type="material" size={25} />
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

export default UserMenu;

const styles = StyleSheet.create({
  headerLogo: {
    width: 150,
    height: 56,
    marginBottom: -12,
    marginLeft: -25,
  },
  headerMenu: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerMenuText: {
    textTransform: "uppercase",
    fontSize: 13,
  },
});
