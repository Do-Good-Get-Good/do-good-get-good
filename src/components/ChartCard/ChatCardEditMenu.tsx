import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../assets/theme/colors";
import typography from "../../assets/theme/typography";
import { DropDownOverlay } from "../DropDowns/DropDownOverlay";
import { AlertQuestion } from "../Alerts/AlertQuestion ";

type Props = {
  onDeletePress: () => void;
};

export const ChatCardEditMenu = ({ onDeletePress }: Props) => {
  const [showMenu, setShowMenu] = useState(false);

  const optionsList = [
    {
      label: "Delete",
      onPress: () => {
        setShowMenu(false);
        AlertQuestion(
          "",
          "Vill du ta bort den här post?",
          onDeletePress,
        );
      },
    },
  ];
  return (
    <TouchableOpacity
      testID="chat-card-edit-menu"
      onPress={() => setShowMenu(!showMenu)}
    >
      <Text style={styles.buttonText}>...</Text>
      {showMenu && (
        <DropDownOverlay
          optionsList={optionsList}
          style={styles.dropDownContainer}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: colors.dark,
    ...typography.h3,
  },
  dropDownContainer: {
    top: 30,
    right: 0,
    // left: 0,
    backgroundColor: colors.background,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    minWidth: 80,
  },
});
