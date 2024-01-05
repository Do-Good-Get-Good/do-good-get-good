import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import auth from "@react-native-firebase/auth";
import crashlytics from "@react-native-firebase/crashlytics";

import { UserLevelProvider } from "./context/UserLevelContext";
import { SuperAdminProvider } from "./context/SuperAdminContext";
import { AdminGalleryProvider } from "./context/AdminGalleryContext";
import { ActivityCardProvider } from "./context/ActivityCardContext";
import { CreateActivityProvider } from "./context/CreateActivityContext/CreateActivityContext";
import { TimeStatisticsProvider } from "./context/TimeStatisticsContext";
import { ActivityImagesProvider } from "./context/ActivityImagesContext/ActivityImagesContext";

import { SuperAdminStack, AdminStack, UserStack } from "./navigate";

import Login from "./components/Login";
import BottomLogo from "./components/BottomLogo";

import typography from "./assets/theme/typography";
import colors from "./assets/theme/colors";

export default function App() {
  // Set an initializing state whilst Firebase connects

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [userClaims, setUserClaims] = useState<{
    superadmin?: string;
    admin?: string;
    user?: string;
  }>();

  // Handle user state changes
  async function onAuthStateChanged(user: any) {
    setUser(user);
    if (user) {
      try {
        let userIdToken = await user.getIdTokenResult();
        setUserClaims(userIdToken.claims);
      } catch (error: any) {
        crashlytics().log("There was an error getting the users ID Token");
        crashlytics().recordError(error);
        console.log(error);
      }
    } else {
      setUserClaims(undefined);
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

  if (userClaims?.superadmin) {
    // Render superadmin content
    return (
      <SafeAreaProvider>
        <ActivityImagesProvider>
          <ActivityCardProvider>
            <AdminGalleryProvider>
              <CreateActivityProvider>
                <UserLevelProvider>
                  <TimeStatisticsProvider>
                    <SuperAdminProvider>
                      <SuperAdminStack />
                    </SuperAdminProvider>
                  </TimeStatisticsProvider>
                </UserLevelProvider>
              </CreateActivityProvider>
            </AdminGalleryProvider>
          </ActivityCardProvider>
        </ActivityImagesProvider>
      </SafeAreaProvider>
    );
  } else if (userClaims?.admin) {
    // Render admin content
    return (
      <SafeAreaProvider>
        <ActivityImagesProvider>
          <ActivityCardProvider>
            <AdminGalleryProvider>
              <CreateActivityProvider>
                <UserLevelProvider>
                  <TimeStatisticsProvider>
                    <AdminStack />
                  </TimeStatisticsProvider>
                </UserLevelProvider>
              </CreateActivityProvider>
            </AdminGalleryProvider>
          </ActivityCardProvider>
        </ActivityImagesProvider>
      </SafeAreaProvider>
    );
  } else if (userClaims?.user) {
    return (
      <SafeAreaProvider>
        <ActivityImagesProvider>
          <UserLevelProvider>
            <TimeStatisticsProvider>
              <UserStack />
            </TimeStatisticsProvider>
          </UserLevelProvider>
        </ActivityImagesProvider>
      </SafeAreaProvider>
    );
  } else {
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.innerWrapper}>
          <Text style={styles.infoText}>
            Något är fel med din användare, vänligen kontakta{" "}
            <Text
              style={{ textDecorationLine: "underline" }}
              onPress={() => Linking.openURL("mailto:dggg@technogarden.se")}
            >
              dggg@technogarden.se
            </Text>
          </Text>
          <TouchableOpacity
            style={styles.logOutBtn}
            onPress={() => auth().signOut()}
          >
            <Text style={styles.logOutBtnText}>Logga ut</Text>
          </TouchableOpacity>
        </View>
        <BottomLogo />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    flex: 1,
    width: "100%",
  },
  innerWrapper: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 16,
  },
  infoText: {
    ...typography.b2,
    textAlign: "center",
  },
  logOutBtn: {
    marginTop: 10,
    height: 50,
    width: "100%",
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  logOutBtnText: {
    color: colors.dark,
    ...typography.button.lg,
  },
});
