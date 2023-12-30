import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import functions from "@react-native-firebase/functions";

import LoadingOverlay from "../../components/LoadingOverlay";
import Menu from "../../components/Menu";
import colors from "../../assets/theme/colors";
import typography from "../../assets/theme/typography";

const updateAllUsersPermissions = (setLoading: (value: boolean) => void) => {
  Alert.alert(
    "Flytta behörighet",
    `Är du säker på att du vill flytta alla användares behörigheter till custom claims?`,
    [
      {
        text: "Nej",
        style: "destructive",
      },
      {
        text: "Ja",
        onPress: () => {
          setLoading(true);
          functions()
            .httpsCallable("updateAllUsersPermissions")()
            .then((res) => {
              setLoading(false);
              console.log(res);
              Alert.alert(
                "Flyttningen lyckades",
                `Flyttningen av användares behörgiheter has slutförts!`,
              );
            })
            .catch((error) => console.log(error));
        },
      },
    ],
  );
};

const DeveloperOptions = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.container}>
      <Menu />
      <View style={styles.contentWrapper}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => updateAllUsersPermissions(setLoading)}
        >
          <Text style={styles.buttonText}>Flytta användares behörigheter</Text>
        </TouchableOpacity>
      </View>
      {loading && <LoadingOverlay />}
    </SafeAreaView>
  );
};

export default DeveloperOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: colors.primary,
    display: "flex",
    alignItems: "center",
  },
  buttonText: {
    ...typography.b2,
  },
});
