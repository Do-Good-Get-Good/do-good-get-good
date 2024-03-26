import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { RadioButton } from "./RadioButton";

type Props = {
  isActive: boolean;
  onYes: (isActive: boolean) => void;
  onNo: (isActive: boolean) => void;
};

export const YesNoRadioButtons = ({ isActive, onYes, onNo }: Props) => {
  return (
    <View style={styles.radioButton}>
      <RadioButton
        label="Aktiva"
        onPress={() => onYes(true)}
        selected={isActive}
      />
      <RadioButton
        label="Inaktiva"
        onPress={() => onNo(false)}
        selected={!isActive}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: "row",
    marginBottom: 12,
    marginTop: 20,
  },
});
