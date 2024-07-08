import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import colors from "../../assets/theme/colors";
import typography from "../../assets/theme/typography";
import { DropDownOverlay, Option } from "../DropDowns/DropDownOverlay";
import { AlertQuestion } from "../Alerts/AlertQuestion ";

type Props = {
  onDeletePress: () => void;
  onEditPress?: () => void;
  textWhatItemToDelete?: string;
  isCurrentUser?: boolean;
  isMessageChanged?: boolean;
};

export const ChatCardEditMenu = ({
  onDeletePress,
  textWhatItemToDelete = "post",
  onEditPress,
  isCurrentUser = false,
  isMessageChanged,
}: Props) => {
  const [showMenu, setShowMenu] = useState(false);
  const isEditButtonVisible = onEditPress && isCurrentUser;

  const editOption: Option = {
    label: "Ändra",
    onPress: () => {
      setShowMenu(false);
      onEditPress && onEditPress();
    },
  };

  const deleteOption: Option = {
    label: "Ta bort",
    onPress: () => {
      setShowMenu(false);
      AlertQuestion(
        "",
        `Vill du ta bort den här ${textWhatItemToDelete}?`,
        onDeletePress,
      );
    },
  };

  const optionsList: Option[] = isEditButtonVisible
    ? [editOption, deleteOption]
    : [deleteOption];

  return (
    <View style={{ flexDirection: "row" }}>
      {isMessageChanged && <Text style={styles.changedText}>ändrats</Text>}
      <TouchableOpacity
        testID="chat-card-edit-menu"
        onPress={() => setShowMenu(!showMenu)}
      >
        <Text style={styles.buttonText}>...</Text>
      </TouchableOpacity>
      {showMenu && (
        <DropDownOverlay
          onOutsidePress={() => setShowMenu(false)}
          optionsList={optionsList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: colors.dark,
    ...typography.h3,
  },
  changedText: {
    ...typography.b2,
    marginHorizontal: 10,
    color: colors.secondary,
    marginTop: 5,
  },
});
