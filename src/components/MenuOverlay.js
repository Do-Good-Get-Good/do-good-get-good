import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Icon, Overlay } from "@rneui/base";

import auth from "@react-native-firebase/auth";

import { useNavigation } from "@react-navigation/native";

import { useUserLevelCheckFunction } from "../context/UserLevelContext";
import { useAdminGalleryFunction } from "../context/AdminGalleryContext";

import { useSuperAdminFunction } from "../context/SuperAdminContext";

import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";

const MenuOverlay = ({ openOverlay, isVisible }) => {
  const navigation = useNavigation();
  const userLevel = useUserLevelCheckFunction();
  const adminGalleryContext = useAdminGalleryFunction();
  const superAdminContext = useSuperAdminFunction();

  function signOutFunction() {
    auth()
      .signOut()
      .then(() => {})
      .catch((error) => {
        console.log("Enable in your firebase console.");

        console.error(error);
      });
  }

  const menuFooter = () => {
    return (
      <View style={styles.menuOverlayFooter}>
        <View style={styles.menuOverlayLoggedInAccount}>
          <Text style={{ ...typography.b2 }}>Inloggad som: </Text>
          <Text style={{ textDecorationLine: "underline", ...typography.b2 }}>
            {auth().currentUser.email}
          </Text>
        </View>
        <TouchableOpacity
          testID="menuOverlay.logoutButton"
          style={styles.menuOverlayLogOutButton}
          onPress={() => signOutFunction()}
        >
          <Text style={styles.menuOverlayLogOutButtonText}>Logga ut</Text>
        </TouchableOpacity>
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
      <TouchableOpacity
        testID="menuOverlay.closeButton"
        style={styles.menuOverlayCloseButton}
        onPress={openOverlay}
      >
        <Icon name="close" size={25} />
        <Text style={styles.menuOverlayCloseButtonText}>Stäng</Text>
      </TouchableOpacity>
      <View style={styles.menuOverlay}>
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
        <View style={styles.menuOverlayItemStyling}>
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
            <>
              <TouchableOpacity
                testID="menuOverlay.allUsersInTheSystem"
                style={styles.menuOverlayLinkStyling}
                onPress={() => {
                  openOverlay();
                  navigation.navigate("AllUsersInTheSystem");
                  superAdminContext.setGetAllUsers(true);
                  superAdminContext.userLevel(userLevel);
                }}
              >
                <Text style={styles.menuOverlayLinkText}>Alla användare</Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="menuOverlay.activitiesButton"
                style={styles.menuOverlayLinkStyling}
                onPress={() => {
                  openOverlay();
                  navigation.navigate("DownloadUserData");
                }}
              >
                <Text style={styles.menuOverlayLinkText}>Exportera data</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        {menuFooter()}
      </View>
    </Overlay>
  );
};

export default MenuOverlay;

const styles = StyleSheet.create({
  menuOverlay: {
    flex: 1,
    paddingHorizontal: 70,
    justifyContent: "space-between",
    ...Platform.select({
      ios: {
        paddingTop: 60,
      },
      android: {
        paddingTop: 2,
      },
    }),
  },
  menuOverlayCloseButton: {
    alignItems: "flex-start",
    alignSelf: "flex-end",
    ...Platform.select({
      ios: {
        top: 60,
        right: 4,
        zIndex: 1,
      },
      android: {
        top: 2,
        right: 4,
      },
    }),
  },
  menuOverlayCloseButtonText: {
    textTransform: "uppercase",
    fontFamily: typography.b2.fontFamily,
    fontSize: typography.b2.fontSize,
    marginTop: -3,
  },
  menuOverlayChangeLangButton: {
    justifyContent: "center",
    width: 100,
    height: 40,
  },
  menuOverlayChangeLangText: {
    ...typography.b1,
  },
  menuOverlayItemStyling: {
    flex: 1,
    marginTop: 40,
  },
  menuOverlayLinkStyling: {
    marginBottom: 6,
  },
  menuOverlayLinkText: {
    ...typography.title,
  },
  menuOverlayFooter: {
    marginBottom: 25,
  },
  menuOverlayLoggedInAccount: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  menuOverlayLogOutButton: {
    width: 100,
    marginTop: 10,
    paddingVertical: 5,
  },
  menuOverlayLogOutButtonText: {
    ...typography.b1,
  },
});
