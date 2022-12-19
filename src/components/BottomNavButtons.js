import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";

const BottomNavButtons = ({
  primaryText,
  secondaryText,
  primaryFunc,
  secondaryFunc,
}) => {
  return (
    <View style={styles.containerForTwoBottomButtons}>
      <TouchableOpacity
        onPress={() => {
          primaryFunc();
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{primaryText}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          secondaryFunc();
        }}
        style={styles.button}
      >
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <View style={styles.textWrapper}>
            <Text style={styles.buttonText}>{secondaryText}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavButtons;

const styles = StyleSheet.create({
  containerForTwoBottomButtons: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  button: {
    marginTop: 10,
    height: 55,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  gradient: {
    height: "100%",
    width: "100%",
    borderRadius: 5,
    padding: 1,
  },
  textWrapper: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.light,
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  buttonText: {
    ...typography.button.lg,
  },
});
