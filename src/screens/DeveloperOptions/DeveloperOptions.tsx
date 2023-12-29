import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Menu from "../../components/Menu";
import colors from "../../assets/theme/colors";
import functions from "@react-native-firebase/functions";

const DeveloperOptions = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Menu />
      <View style={styles.contentWrapper}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            const test = functions().httpsCallable("updateAllUsersPermissions");

            test().then(() => console.log("DONE"));
          }}
        >
          <Text>Move users permissions to custom claims</Text>
        </TouchableOpacity>
      </View>
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
});
