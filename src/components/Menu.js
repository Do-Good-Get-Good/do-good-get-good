import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  StatusBar,
} from "react-native";
import { Icon } from "react-native-elements";
import MenuOverlay from "./MenuOverlay";
import typography from "../assets/theme/typography";
import { useNetInfo } from "@react-native-community/netinfo";
import colors from "../assets/theme/colors";

const Menu = () => {
  const [visible, setVisible] = useState(false);
  const inetInfo = useNetInfo();
  const noInternetText =
    "Ingen internetanslutning, dina ändringar kanske inte sparas";

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const ifNoInternetConnection = () => {
    return (
      <View>
        <Text style={styles.ifNoInternet}>{noInternetText}</Text>
      </View>
    );
  };

  return (
    <>
      <View style={styles.header}>
        <StatusBar
          backgroundColor={visible ? colors.primary : colors.light}
          barStyle="dark-content"
          animated
        />
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
      {inetInfo.isConnected === false && ifNoInternetConnection()}

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
  ifNoInternet: {
    ...typography.b1,
    color: colors.error,
    alignSelf: "flex-start",
    marginHorizontal: 16,
  },
});
