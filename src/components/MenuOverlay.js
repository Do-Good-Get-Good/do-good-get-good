import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, Platform } from "react-native";

import { Icon, Overlay } from "react-native-elements";

import auth from "@react-native-firebase/auth";

import { useNavigation } from "@react-navigation/native";

import { useAdminCheckFunction } from "../context/AdminContext";
import { useAdminGalleryFunction } from "../context/AdminGalleryContext";
import { useActivityFunction } from "../context/ActivityContext";

import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";
import { SafeAreaView } from "react-native-safe-area-context";

const MenuOverlay = ({ openOverlay, isVisible }) => {
  const navigation = useNavigation();
  const [isAdmin, setIsAdmin] = useState(false);
  const response = useAdminCheckFunction();
  const adminGalleryContext = useAdminGalleryFunction();
  const entryTime = useActivityFunction();

  useEffect(() => {
    const checkIfUserIsAdmin = () => {
      if (response === "admin") setIsAdmin(true);
      else setIsAdmin(false);
    };
    checkIfUserIsAdmin();
  }, [isVisible]);

  function signOutFunction() {
    auth()
      .signOut()
      .then(() => {})
      .catch((error) => {
        console.log("Enable in your firebase console.");

        console.error(error);
      });
  }

  return (
    <Overlay
      isVisible={isVisible}
      fullScreen
      animationType="fade"
      overlayStyle={{
        backgroundColor: colors.primary,
      }}
    >
      <SafeAreaView style={styles.menuOverlay}>
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
                adminGalleryContext.chooseActiveOrNot(true);
                adminGalleryContext.setCleanUpSearchBarComponent(true);
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
                navigation.navigate("MyTimePage");
                entryTime.setLimitAmountForTimeEntries(20);
              }}
            >
              <Text style={styles.menuOverlayLinkText}>Min tid</Text>
            </Pressable>
          )}

          <Pressable
            testID="menuOverlay.aboutButton"
            style={styles.menuOverlayLinkStyling}
            onPress={() => {
              openOverlay();
              navigation.navigate("ConceptPage");
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
          onPress={() => signOutFunction()}
        >
          <Text style={styles.menuOverlayLogOutButtonText}>Logga ut</Text>
        </Pressable>
      </SafeAreaView>
    </Overlay>
  );
};

export default MenuOverlay;

const styles = StyleSheet.create({
  menuOverlay: {
    flex: 1,
    ...Platform.select({
      ios: {
        paddingTop: 12,
      },
      android: {
        paddingTop: 2,
      },
    }),
  },
  menuOverlayHeader: {
    alignSelf: "flex-end",
    paddingRight: 4,
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
