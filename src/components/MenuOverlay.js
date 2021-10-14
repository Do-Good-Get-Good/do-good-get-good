import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Icon, Overlay } from "react-native-elements";
import auth from "@react-native-firebase/auth";
import { StatusBar } from "expo-status-bar";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";
import firestore from "@react-native-firebase/firestore";

const MenuOverlay = ({ openOverlay, isVisible }) => {
  const navigation = useNavigation();
  const [isAdmin, setIsAdmin] = useState(false);

  const checkIfUserIsAdmin = async () => {
    const response = await firestore()
      .collection("Users")
      .doc(auth().currentUser.uid)
      .get();
    if (response.data().role === "admin") {
      setIsAdmin(true);
    }
  };

  if (isVisible) {
    checkIfUserIsAdmin();
  }

  return (
    <Overlay
      isVisible={isVisible}
      fullScreen
      animationType="fade"
      overlayStyle={{ backgroundColor: "#84BD00" }}
    >
      <StatusBar style="auto" />
      <View style={styles.menuOverlay}>
        <View style={styles.menuOverlayHeader}>
          <Pressable
            style={styles.menuOverlayCloseButton}
            onPress={openOverlay}
          >
            <Icon name="close" size={25} />
            <Text style={styles.menuOverlayCloseButtonText}>Stäng</Text>
          </Pressable>
        </View>
        <View style={styles.menuOverlayItemStyling}>
          <Pressable style={styles.menuOverlayChangeLangButton}>
            <Text style={styles.menuOverlayChangeLangText}>
              Byt språk knapp
            </Text>
          </Pressable>
          <Pressable
            style={styles.menuOverlayLinkStyling}
            onPress={() => {
              navigation.navigate("LandingPage");
            }}
          >
            <Text style={styles.menuOverlayLinkText}>Hem</Text>
          </Pressable>
          <Pressable
            style={styles.menuOverlayLinkStyling}
            onPress={() => {
              navigation.navigate("MyTimePage");
            }}
          >
            <Text style={styles.menuOverlayLinkText}>Min tid</Text>
          </Pressable>
          <Pressable
            style={styles.menuOverlayLinkStyling}
            onPress={() => {
              // navigation.navigate("");
            }}
          >
            <Text style={styles.menuOverlayLinkText}>Om</Text>
          </Pressable>
          <Pressable
            style={styles.menuOverlayLinkStyling}
            onPress={() => {
              // navigation.navigate("");
            }}
          >
            <Text style={styles.menuOverlayLinkText}>FAQ</Text>
          </Pressable>
          {isAdmin ? (
            <Pressable
              style={styles.menuOverlayLinkStyling}
              onPress={() => {
                // navigation.navigate("");
              }}
            >
              <Text style={styles.menuOverlayLinkText}>Lägga in tid?</Text>
            </Pressable>
          ) : null}
        </View>
        <View style={tw`bg-blue-500 absolute bottom-14 self-center`}>
          <Text style={tw`text-sm text-center text-white p-1`}>
            Inloggad mail: {auth().currentUser.email}
          </Text>
        </View>
        <Pressable
          style={styles.menuOverlayLogOutButton}
          onPress={() => {
            auth()
              .signOut()
              .then(() => console.log("User signed out!"));
          }}
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
    fontSize: 13,
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
    fontSize: 14,
    fontWeight: "normal",
  },
  menuOverlayLinkStyling: {
    marginBottom: 24,
  },
  menuOverlayLinkText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  menuOverlayLogOutButton: {
    position: "absolute",
    bottom: 16,
    alignSelf: "center",
  },
  menuOverlayLogOutButtonText: {
    fontSize: 16,
  },
});
