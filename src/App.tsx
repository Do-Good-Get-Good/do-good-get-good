import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { SuperAdminStack, AdminStack, UserStack } from "./navigate";

import BottomLogo from "./components/BottomLogo";

import typography from "./assets/theme/typography";
import colors from "./assets/theme/colors";
import { useAuthStateListener } from "./hooks/useAuthStateListener";
import { Login } from "./components/Login";
import { usePushNotificationChat } from "./hooks/usePushNotificationChat";

export default function App() {
  const { initializing, user, userClaims, signOut } = useAuthStateListener();
  const { linking } = usePushNotificationChat();

  if (initializing) return null;

  if (!user) {
    return <Login />;
  }

  if (!userClaims) {
    return <Login />;
  }

  if (userClaims?.superadmin) {
    return <SuperAdminStack linking={linking} />;
  } else if (userClaims?.admin) {
    return <AdminStack linking={linking} />;
  } else if (userClaims?.user) {
    return <UserStack linking={linking} />;
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
