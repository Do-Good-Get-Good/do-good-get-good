import React from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { EventProvider } from "react-native-outside-press";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "./assets/theme/colors";
import typography from "./assets/theme/typography";
import BottomLogo from "./components/BottomLogo";
import { Login } from "./components/Login";
import { useAuthStateListener } from "./hooks/useAuthStateListener";
import { useCheckIfUserStatusActive } from "./hooks/useCheckIfUserStatusActive";
import { AdminStack, SuperAdminStack, UserStack } from "./navigate";

const App = () => {
  const { initializing, user, userClaims, signOut } = useAuthStateListener();
  useCheckIfUserStatusActive(user);
  if (initializing) return null;

  if (!user) {
    return <Login />;
  }

  if (!userClaims) {
    return <Login />;
  }

  if (userClaims?.superadmin) {
    return (
      <EventProvider>
        <SuperAdminStack />
      </EventProvider>
    );
  } else if (userClaims?.admin) {
    return (
      <EventProvider>
        <AdminStack />
      </EventProvider>
    );
  } else if (userClaims?.user) {
    return (
      <EventProvider>
        <UserStack />
      </EventProvider>
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
};

export default App;

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
