import React, { useState, useEffect } from "react";
import { useAdminGalleryFunction } from "../context/AdminGalleryContext";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";

import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

export function RadioButton(props) {
  const [jaButton, setJaButton] = useState(true);
  const [nejButton, setNejButton] = useState(false);
  const adminGalleryContext = useAdminGalleryFunction();

  const jaRadioButtonsPress = () => {
    setJaButton(true);
    setNejButton(false);
    adminGalleryContext.chooseActiveOrNot(true);
  };

  const nejRadioButtonsPress = () => {
    setNejButton(true);
    setJaButton(false);
    adminGalleryContext.chooseActiveOrNot(false);
  };

  return (
    <View style={props.style}>
      <Text style={styles.textAktiva}>Aktiva:</Text>
      <TouchableOpacity
        testID="pressOnButtonJa"
        onPress={jaRadioButtonsPress}
        style={styles.radioButtons}
      >
        <Text style={styles.textJaNej}>Ja</Text>
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
          {jaButton === true ? <View style={styles.smallCircul}></View> : null}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        testID="pressOnButtonNej"
        onPress={nejRadioButtonsPress}
        style={styles.radioButtons}
      >
        <Text style={styles.textJaNej}>Nej</Text>
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
          {nejButton === true ? <View style={styles.smallCircul}></View> : null}
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default RadioButton;

const styles = StyleSheet.create({
  textAktiva: {
    fontSize: typography.button.lg.fontSize,
    color: colors.dark,
  },
  textJaNej: {
    ...typography.b2,
    color: colors.dark,
    paddingLeft: 8,
    paddingRight: 4,
    paddingTop: 7,
  },
  radioButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  smallCircul: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    margin: 4,
    backgroundColor: colors.dark,
  },
});
