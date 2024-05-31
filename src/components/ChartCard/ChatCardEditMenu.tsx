import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../assets/theme/colors";
import typography from "../../assets/theme/typography";
import { DropDownOverlay } from "../DropDowns/DropDownOverlay";
import { AlertQuestion } from "../Alerts/AlertQuestion ";

type Props = {
  onDeletePress: () => void;
  onEditPress:()=>void;
  textWhatItemToDelete?: string
};

export const ChatCardEditMenu = ({ onDeletePress , textWhatItemToDelete = 'post',onEditPress }: Props) => {
  const [showMenu, setShowMenu] = useState(false);

  const optionsList = [
    {
      label: "Edit",
      onPress: () => {
        setShowMenu(false);
        onEditPress()
      },
    },
    
    {
      label: "Delete",
      onPress: () => {
        setShowMenu(false);
        AlertQuestion(
          "",
          `Vill du ta bort den här ${textWhatItemToDelete}?`,
          onDeletePress,
        );
      },
    },
  ];
  return (
    <View style={styles.container}>
      <TouchableOpacity
        testID="chat-card-edit-menu"
        onPress={() => setShowMenu(!showMenu)}
      >
        <Text style={styles.buttonText}>...</Text>
      </TouchableOpacity>
      {showMenu && (
        <DropDownOverlay
          optionsList={optionsList}
          style={styles.dropDownContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  buttonText: {
    color: colors.dark,
    ...typography.h3,
  },
  dropDownContainer: {
    top: 30,
    right: 0,
    backgroundColor: colors.background,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    minWidth:80,
    zIndex: 1, 
  },
});
