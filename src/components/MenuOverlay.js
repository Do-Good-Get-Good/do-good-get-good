import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Icon, Overlay } from "react-native-elements";

import auth from "@react-native-firebase/auth";

import { useNavigation } from "@react-navigation/native";

import { useAdminCheckFunction } from "../context/AdminContext";
import { useAdminGalleryFunction } from "../context/AdminGalleryContext";

import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";

const MenuOverlay = ({ openOverlay, isVisible }) => {
  const navigation = useNavigation();
  const userLevel = useAdminCheckFunction();
  const adminGalleryContext = useAdminGalleryFunction();

  function signOutFunction() {
    auth()
      .signOut()
      .then(() => {})
      .catch((error) => {
        console.log("Enable in your firebase console.");

        console.error(error);
      });
  }

  const loggedInUser = () => {
    return (
      <View style={styles.menuOverlayLoggedInAccount}>
        <Text style={{ ...typography.b2 }}>Inloggad på: </Text>
        <Text style={{ textDecorationLine: "underline", ...typography.b2 }}>
          {auth().currentUser.email}
        </Text>
      </View>
    );
  };

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
          <TouchableOpacity
            testID="menuOverlay.closeButton"
            style={styles.menuOverlayCloseButton}
            onPress={openOverlay}
          >
            <Icon name="close" size={25} />
            <Text style={styles.menuOverlayCloseButtonText}>Stäng</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menuOverlayItemStyling}>
          <TouchableOpacity
            testID="menuOverlay.languageButton"
            style={styles.menuOverlayChangeLangButton}
            onPress={() => {
              // openOverlay();
              // changeLanguage();
            }}
          >
            <Text style={styles.menuOverlayChangeLangText}>Byt språk</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID="menuOverlay.homeButton"
            style={styles.menuOverlayLinkStyling}
            onPress={() => {
              openOverlay();
              navigation.navigate("HomePage");
            }}
          >
            <Text style={styles.menuOverlayLinkText}>Hem</Text>
          </TouchableOpacity>

          <TouchableOpacity
            testID="menuOverlay.myTimeButton"
            style={styles.menuOverlayLinkStyling}
            onPress={() => {
              openOverlay();
              navigation.navigate("MyTimePage");
            }}
          >
            <Text style={styles.menuOverlayLinkText}>Min tid</Text>
          </TouchableOpacity>

          {(userLevel === "admin" || userLevel === "superadmin") && (
            <>
              <TouchableOpacity
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
              </TouchableOpacity>

              <TouchableOpacity
                testID="menuOverlay.adminButton"
                style={styles.menuOverlayLinkStyling}
                onPress={() => {
                  openOverlay();
                  navigation.navigate("AdminPage");
                }}
              >
                <Text style={styles.menuOverlayLinkText}>Admin</Text>
              </TouchableOpacity>
            </>
          )}

          {userLevel === "superadmin" && (
            <TouchableOpacity
              testID="menuOverlay.superAdminButton"
              style={styles.menuOverlayLinkStyling}
              onPress={() => {
                openOverlay();
                navigation.navigate("SuperAdminPage");
              }}
            >
              <Text style={styles.menuOverlayLinkText}>Super admin</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            testID="menuOverlay.aboutButton"
            style={styles.menuOverlayLinkStyling}
            onPress={() => {
              openOverlay();
              navigation.navigate("ConceptPage");
            }}
          >
            <Text style={styles.menuOverlayLinkText}>Om konceptet</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID="menuOverlay.faqButton"
            style={styles.menuOverlayLinkStyling}
            onPress={() => {
              openOverlay();
              navigation.navigate("Faq");
            }}
          >
            <Text style={styles.menuOverlayLinkText}>FAQ</Text>
          </TouchableOpacity>
        </View>

        {loggedInUser()}
        <TouchableOpacity
          testID="menuOverlay.logoutButton"
          style={styles.menuOverlayLogOutButton}
          onPress={() => signOutFunction()}
        >
          <Text style={styles.menuOverlayLogOutButtonText}>Logga ut</Text>
        </TouchableOpacity>
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
    marginBottom: 6,
  },
  menuOverlayLinkText: {
    ...typography.title,
  },
  menuOverlayLoggedInAccount: {
    position: "absolute",
    bottom: 75,
    paddingLeft: 75,
    flexDirection: "row",
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
