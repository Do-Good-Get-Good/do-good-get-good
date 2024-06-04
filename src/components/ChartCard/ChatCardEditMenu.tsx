import React, { useState } from "react";
import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle , } from "react-native";
import colors from "../../assets/theme/colors";
import typography from "../../assets/theme/typography";
import { DropDownOverlay, Option } from "../DropDowns/DropDownOverlay";
import { AlertQuestion } from "../Alerts/AlertQuestion ";




type Props = {
  onDeletePress: () => void;
  onEditPress?:()=>void;
  textWhatItemToDelete?: string;
  isCurrentUser?: boolean;
};


export const ChatCardEditMenu = ({ onDeletePress , textWhatItemToDelete = 'post',onEditPress,isCurrentUser = false}: Props) => {
  const [showMenu, setShowMenu] = useState(false);
  const isEditButtonVisible = onEditPress && isCurrentUser


  const editOption: Option  = {
    label: "Edit",
    onPress: () => {
      setShowMenu(false);
      onEditPress &&  onEditPress();
    },
  };
  
  const deleteOption: Option = {
    label: "Delete",
    onPress: () => {
      setShowMenu(false);
      AlertQuestion(
        "",
        `Vill du ta bort den här ${textWhatItemToDelete}?`,
        onDeletePress
      );
    },
  };

const optionsList: Option[] = isEditButtonVisible ? [editOption, deleteOption] : [deleteOption]

  return (
    <View>
      <TouchableOpacity
        testID="chat-card-edit-menu"
        onPress={() => setShowMenu(!showMenu)}
      >
        <Text style={styles.buttonText}>...</Text>
      </TouchableOpacity>
      {showMenu &&      
     <DropDownOverlay style={styles.dropDownContainer}
      optionsList={optionsList}
      />}
   </View>
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
    // backgroundColor: colors.background, 
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    minWidth:80,
  },
});
