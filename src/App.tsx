import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { UserLevelProvider } from "./context/UserLevelContext";
import { SuperAdminProvider } from "./context/SuperAdminContext";
import { AdminGalleryProvider } from "./context/AdminGalleryContext";
import { ActivityCardProvider } from "./context/ActivityCardContext";
import { CreateActivityProvider } from "./context/CreateActivityContext";
import { TimeStatisticsProvider } from "./context/TimeStatisticsContext";

import { SuperAdminStack, AdminStack, UserStack } from "./navigate";

import Login from "./components/Login";
import BottomLogo from "./components/BottomLogo";

import typography from "./assets/theme/typography";
import colors from "./assets/theme/colors";
import { useAuthStateListener } from "./hooks/useAuthStateListener";

export default function App() {
  const { initializing, user, userLevel, signOut } = useAuthStateListener();

  if (initializing) return null;

  if (!user) {
    return <Login />;
  }

  if (!userLevel) {
    return <Login />;
  }

  if (userLevel?.superadmin) {
    // Render superadmin content
    return (
      <SafeAreaProvider>
        <ActivityCardProvider>
          <AdminGalleryProvider>
            <CreateActivityProvider>
              <UserLevelProvider userLevel={userLevel}>
                <TimeStatisticsProvider>
                  <SuperAdminProvider>
                    <SuperAdminStack developer={userLevel.developer ?? false} />
                  </SuperAdminProvider>
                </TimeStatisticsProvider>
              </UserLevelProvider>
            </CreateActivityProvider>
          </AdminGalleryProvider>
        </ActivityCardProvider>
      </SafeAreaProvider>
    );
  } else if (userLevel?.admin) {
    // Render admin content
    return (
      <SafeAreaProvider>
        <ActivityCardProvider>
          <AdminGalleryProvider>
            <CreateActivityProvider>
              <UserLevelProvider userLevel={userLevel}>
                <TimeStatisticsProvider>
                  <AdminStack />
                </TimeStatisticsProvider>
              </UserLevelProvider>
            </CreateActivityProvider>
          </AdminGalleryProvider>
        </ActivityCardProvider>
      </SafeAreaProvider>
    );
  } else if (userLevel?.user) {
    return (
      <SafeAreaProvider>
        <UserLevelProvider userLevel={userLevel}>
          <TimeStatisticsProvider>
            <UserStack />
          </TimeStatisticsProvider>
        </UserLevelProvider>
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
          <TouchableOpacity style={styles.logOutBtn} onPress={signOut}>
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
