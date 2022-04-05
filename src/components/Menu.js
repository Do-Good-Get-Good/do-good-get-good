import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Header } from "react-native-elements/dist/header/Header";
import { Icon } from "react-native-elements";
import MenuOverlay from "./MenuOverlay";
import { Platform } from "react-native";
import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";
import { useNetInfo } from "@react-native-community/netinfo";

const Menu = () => {
  const [visible, setVisible] = useState(false);
  const inetInfo = useNetInfo();

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const ifNoInternetConnection = () => {
    return (
      <View>
        <Text style={styles.ifNoInternet}>
          Ingen internetanslutning, dina ändringar kanske inte sparas
        </Text>
      </View>
    );
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
      {inetInfo.isConnected === false && ifNoInternetConnection()}

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
  ifNoInternet: {
    ...typography.b1,
    color: colors.error,
    alignSelf: "flex-start",
    marginHorizontal: 16,
  },
});
