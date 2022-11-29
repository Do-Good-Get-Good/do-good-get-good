import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { SafeAreaProvider } from "react-native-safe-area-context";

import auth from "@react-native-firebase/auth";

import { UserLevelProvider } from "./context/UserLevelContext";
import { ActivityProvider } from "./context/ActivityContext";
import { SuperAdminProvider } from "./context/SuperAdminContext";
import { AdminGalleryProvider } from "./context/AdminGalleryContext";
import { ActivityCardProvider } from "./context/ActivityCardContext";
import { AdminHomePageProvider } from "./context/AdminHomePageContext";
import { CreateActivityProvider } from "./context/CreateActivityContext";
import { ChangeUserInfoProvider } from "./context/ChangeUserInfoContext";

import { Mystack } from "./navigate";

import Login from "./components/Login";
import BottomLogo from "./components/BottomLogo";

import typography from "./assets/theme/typography";
import colors from "./assets/theme/colors";

export default function App() {
  // Set an initializing state whilst Firebase connects

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [userClaims, setUserClaims] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (user) {
      user
        .getIdTokenResult()
        .then((res) => {
          setUserClaims(res.claims);
        })
        .catch((error) => console.log(error));
    }
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return <Login />;
  }

  if (!userClaims) {
    return <Login />;
  }

  if (userClaims.superadmin) {
    // Render superadmin content
    return (
      <SafeAreaProvider>
        <ChangeUserInfoProvider>
          <ActivityCardProvider>
            <AdminGalleryProvider>
              <CreateActivityProvider>
                <UserLevelProvider>
                  <ActivityProvider>
                    <SuperAdminProvider>
                      <AdminHomePageProvider>
                        <Mystack />
                      </AdminHomePageProvider>
                    </SuperAdminProvider>
                  </ActivityProvider>
                </UserLevelProvider>
              </CreateActivityProvider>
            </AdminGalleryProvider>
          </ActivityCardProvider>
        </ChangeUserInfoProvider>
      </SafeAreaProvider>
    );
  } else if (userClaims.admin) {
    // Render admin content
    return (
      <SafeAreaProvider>
        <ChangeUserInfoProvider>
          <ActivityCardProvider>
            <AdminGalleryProvider>
              <CreateActivityProvider>
                <UserLevelProvider>
                  <ActivityProvider>
                    <AdminHomePageProvider>
                      <Mystack />
                    </AdminHomePageProvider>
                  </ActivityProvider>
                </UserLevelProvider>
              </CreateActivityProvider>
            </AdminGalleryProvider>
          </ActivityCardProvider>
        </ChangeUserInfoProvider>
      </SafeAreaProvider>
    );
  } else if (userClaims.user) {
    return (
      <SafeAreaProvider>
        <ActivityCardProvider>
          <AdminGalleryProvider>
            <CreateActivityProvider>
              <UserLevelProvider>
                <ActivityProvider>
                  <Mystack />
                </ActivityProvider>
              </UserLevelProvider>
            </CreateActivityProvider>
          </AdminGalleryProvider>
        </ActivityCardProvider>
      </SafeAreaProvider>
    );
  } else {
    return (
      <View style={styles.wrapper}>
        <View style={styles.innerWrapper}>
          <Text style={styles.infoText}>
            Något är fel med din användare, vänligen kontakta
            dggg@technogarden.se
          </Text>
          <TouchableOpacity
            style={styles.logOutBtn}
            onPress={() => auth().signOut()}
          >
            <Text style={styles.logOutBtnText}>Logga ut</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottonLogoView}>
          <BottomLogo />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  innerWrapper: {
    width: "80%",
  },
  infoText: {
    ...typography.b2,
    textAlign: "center",
  },
  logOutBtn: {
    marginTop: 10,
    height: 50,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  logOutBtnText: {
    color: "#FFFFFF",
    ...typography.button.lg,
  },
  bottonLogoView: {
    position: "absolute",
    bottom: 0,
  },
});
