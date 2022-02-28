import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Icon, Overlay } from "react-native-elements";
import auth from "@react-native-firebase/auth";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";
import { useAdminCheckFunction } from "../context/AdminContext";
import { useActivityFunction } from "../context/ActivityContext";
import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";

const MenuOverlay = ({ openOverlay, isVisible }) => {
  const navigation = useNavigation();
  const [isAdmin, setIsAdmin] = useState(false);
  const response = useAdminCheckFunction();
  const entryTime = useActivityFunction();

  useEffect(() => {
    const checkIfUserIsAdmin = () => {
      if (response === "admin") setIsAdmin(true);
      else setIsAdmin(false);
    };
    checkIfUserIsAdmin();
  }, [isVisible]);

  return (
    <Overlay
      isVisible={isVisible}
      fullScreen
      animationType="fade"
      overlayStyle={{ backgroundColor: colors.primary }}
    >
      <StatusBar style="auto" />
      <View style={styles.menuOverlay}>
        <View style={styles.menuOverlayHeader}>
          <Pressable
            testID="menuOverlay.closeButton"
            style={styles.menuOverlayCloseButton}
            onPress={openOverlay}
          >
            <Icon name="close" size={25} />
            <Text style={styles.menuOverlayCloseButtonText}>Stäng</Text>
          </Pressable>
        </View>
        <View style={styles.menuOverlayItemStyling}>
          <Pressable
            testID="menuOverlay.languageButton"
            style={styles.menuOverlayChangeLangButton}
            onPress={() => {
              // openOverlay();
              // changeLanguage();
            }}
          >
            <Text style={styles.menuOverlayChangeLangText}>Byt språk</Text>
          </Pressable>
          <Pressable
            testID="menuOverlay.homeButton"
            style={styles.menuOverlayLinkStyling}
            onPress={() => {
              openOverlay();
              navigation.navigate("HomePage");
            }}
          >
            <Text style={styles.menuOverlayLinkText}>Hem</Text>
          </Pressable>

          {isAdmin ? (
            <Pressable
              testID="menuOverlay.activitiesButton"
              style={styles.menuOverlayLinkStyling}
              onPress={() => {
                openOverlay();
                navigation.navigate("AdminActivityGallery");
              }}
            >
              <Text style={styles.menuOverlayLinkText}>Aktiviteter</Text>
            </Pressable>
          ) : (
            <Pressable
              testID="menuOverlay.myTimeButton"
              style={styles.menuOverlayLinkStyling}
              onPress={() => {
                openOverlay();
                entryTime.getIfoFromActivitiesList(true);
                navigation.navigate("MyTimePage");
              }}
            >
              <Text style={styles.menuOverlayLinkText}>Min tid</Text>
            </Pressable>
          )}

          <Pressable
            testID="menuOverlay.aboutButton"
            style={styles.menuOverlayLinkStyling}
            onPress={() => {
              // openOverlay();
              // navigation.navigate("");
            }}
          >
            <Text style={styles.menuOverlayLinkText}>Om konceptet</Text>
          </Pressable>
          <Pressable
            testID="menuOverlay.faqButton"
            style={styles.menuOverlayLinkStyling}
            onPress={() => {
              openOverlay();
              navigation.navigate("Faq");
            }}
          >
            <Text style={styles.menuOverlayLinkText}>FAQ</Text>
          </Pressable>
        </View>
        <Pressable
          testID="menuOverlay.logoutButton"
          style={styles.menuOverlayLogOutButton}
          onPress={() => auth().signOut()}
        >
          <Text style={styles.menuOverlayLogOutButtonText}>Logga ut</Text>
        </Pressable>
      </View>
    </Overlay>
  );
};

export default MenuOverlay;

const styles = StyleSheet.create({
  menuOverlay: {
    flex: 1,
    margin: -10,
    ...Platform.select({
      ios: {
        marginTop: 35,
        marginBottom: 10,
      },
    }),
  },
  menuOverlayHeader: {
    alignSelf: "flex-end",
    marginTop: 10,
    marginRight: 16,
  },
  menuOverlayCloseButton: {
    alignItems: "flex-start",
  },
  menuOverlayCloseButtonText: {
    textTransform: "uppercase",
    fontFamily: typography.b2.fontFamily,
    fontSize: typography.b2.fontSize,
    marginTop: -3,
  },
  menuOverlayItemStyling: {
    paddingLeft: 75,
  },
  menuOverlayChangeLangButton: {
    marginBottom: 48,
    marginTop: 16,
  },
  menuOverlayChangeLangText: {
    ...typography.b1,
  },
  menuOverlayLinkStyling: {
    marginBottom: 12,
  },
  menuOverlayLinkText: {
    ...typography.title,
  },
  menuOverlayLogOutButton: {
    position: "absolute",
    bottom: 40,
    paddingLeft: 75,
  },
  menuOverlayLogOutButtonText: {
    ...typography.b1,
  },
});
