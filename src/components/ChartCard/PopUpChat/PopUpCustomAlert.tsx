import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Overlay } from "@rneui/base";
import colors from "../../../assets/theme/colors";
import typography from "../../../assets/theme/typography";

type Props = {
  visible: boolean;
  onBackdropPress: () => void;
  message: string;
  onYesPressed: () => void;
  onNoPressed: () => void;
};

export const PopUpCustomAlert = ({ visible, onBackdropPress, message, onYesPressed, onNoPressed }: Props) => {
  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={onBackdropPress}
      animationType="fade"
      overlayStyle={styles.overlayStyle}
    >
      <Text style={styles.textQuestionAlert}>{message}</Text>
      <View style={styles.containerButtonsAlert}>
        <TouchableOpacity
          style={[styles.alertButton, { backgroundColor: colors.light }]}
          onPress={onNoPressed}
        >
          <Text style={styles.buttonAlertText}>No</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.alertButton, { backgroundColor: colors.primary }]}
          onPress={onYesPressed}
        >
          <Text style={styles.buttonAlertText}>Yes</Text>
        </TouchableOpacity>
      </View>
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
  containerButtonsAlert: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  alertButton: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
    minWidth: "30%",
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonAlertText: {
    ...typography.button.sm,
  },
});
