import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Overlay } from "@rneui/base";
import colors from "../../../assets/theme/colors";
import typography from "../../../assets/theme/typography";

type Props = {
  visible: boolean;
  onBackdropPress: () => void;
  message: string; // Pass the message as a prop
  buttonText: string; // Pass the button text as a prop
  onButtonPress: () => void; // Pass the button press handler as a prop
};

export const PopUpPost = ({
  visible,
  onBackdropPress,
  message,
  buttonText,
  onButtonPress,
}: Props) => {
  return (
    <Overlay
      onBackdropPress={onBackdropPress}
      isVisible={visible}
      animationType="fade"
      overlayStyle={styles.overlayStyle}
    >
      <Text style={styles.textQuestionAlert}>{message}</Text>
      <TouchableOpacity
        style={[styles.alertButton, { backgroundColor: colors.primary }]}
        onPress={onButtonPress} // Use the provided button press handler
      >
        <Text style={styles.buttonAlertText}>{buttonText}</Text>
      </TouchableOpacity>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  textQuestionAlert: {
    color: colors.dark,
    ...typography.cardTitle,
    margin: 8,
  },
  overlayStyle: {
    backgroundColor: colors.light,
  },
  alertButton: {
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 80,
    paddingVertical: 8,
    borderRadius: 5,
  },
  buttonAlertText: {
    ...typography.button.lg,
  },
});
