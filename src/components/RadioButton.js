import React, { useState, useEffect } from "react";
import { useAdminGalleryFunction } from "../context/AdminGalleryContext";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";

import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

export function RadioButton() {
  const [jaButton, setJaButton] = useState(true);
  const [nejButton, setNejButton] = useState(false);
  const adminGalleryContext = useAdminGalleryFunction();

  const jaRadioButtonsPress = () => {
    if (jaButton != true) {
      setJaButton(true);
      setNejButton(false);
      adminGalleryContext.chooseActiveOrNot(false);
    }
  };

  const nejRadioButtonsPress = () => {
    if (nejButton != true) {
      setNejButton(true);
      setJaButton(false);
      adminGalleryContext.chooseActiveOrNot(true);
    }
  };

  return (
    <View>
      <View style={styles.textRadioButtonFilter}>
        <View style={styles.radioButtons}>
          <Text style={styles.textAktiva}>Aktiva:</Text>
          <TouchableOpacity
            testID="pressOnButtonJa"
            onPress={jaRadioButtonsPress}
            style={styles.radioButtons}
          >
            <Text style={styles.textJaNej}> Ja </Text>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 20 / 2,
                backgroundColor:
                  jaButton === true ? colors.primary : colors.background,
                borderColor: colors.dark,
                borderWidth: 1,
              }}
            >
              {jaButton === true ? (
                <View style={styles.smallCircul}></View>
              ) : null}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            testID="pressOnButtonNej"
            onPress={nejRadioButtonsPress}
            style={styles.radioButtons}
          >
            <Text style={styles.textJaNej}> Nej </Text>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 20 / 2,
                backgroundColor:
                  nejButton === true ? colors.primary : colors.background,
                borderColor: colors.dark,
                borderWidth: 1,
              }}
            >
              {nejButton === true ? (
                <View style={styles.smallCircul}></View>
              ) : null}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default RadioButton;

const styles = StyleSheet.create({
  textAktiva: {
    fontSize: 20,
    paddingTop: 8,
    color: colors.dark,
  },
  textJaNej: {
    ...typography.b2,
    paddingTop: 2,
    marginLeft: 5,
    color: colors.dark,
  },
  textRadioButtonFilter: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 16,
  },
  radioButtons: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 10,
  },

  smallCircul: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    margin: 4,
    backgroundColor: colors.dark,
  },
});
