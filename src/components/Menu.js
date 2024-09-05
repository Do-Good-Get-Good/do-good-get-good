import { useNetInfo } from "@react-native-community/netinfo";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Config from "react-native-config";
import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";
import DevRelease from "./DevRelease";
import { MenuOverlay } from "./MenuOverlay";

const Menu = () => {
  const navigation = useNavigation();
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
    <View>
      <View style={styles.header}>
        <StatusBar
          backgroundColor={visible ? colors.primary : colors.light}
          barStyle="dark-content"
          animated
        />
        <View style={styles.headerLogo}>
          <Pressable
            onPress={() => {
              navigation.navigate("HomePage");
            }}
          >
            <Image
              testID="dgggLogo"
              source={require("../assets/images/Logotyp_DGGG.png")}
              style={styles.headerLogo}
            />
          </Pressable>
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
      {Config.NODE_ENV === "dev" && <DevRelease />}
      <MenuOverlay openOverlay={toggleOverlay} isVisible={visible} />
    </View>
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
    marginHorizontal: 16,
  },
});
