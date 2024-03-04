import React, { useState } from "react";
import {
  FlexStyle,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { ArrowUpDown } from "../../assets/icons/ArrowUpDown";
import colors from "../../assets/theme/colors";
import typography from "../../assets/theme/typography";
import { boolean } from "yup";

type OptionsListType = {
  [key: string]: string;
};

type Props = {
  mainTitle: string;
  optionsList: OptionsListType;
  // selected: keyof OptionsListType;
  onSelect: (select: keyof OptionsListType) => void;
};

export const DropDown = ({
  mainTitle,
  optionsList,
  onSelect,
  // selected,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const onPress = (key: keyof OptionsListType) => {
    onSelect(key);
    setIsOpen(!isOpen);
  };
  return (
    <View>
      <TouchableOpacity
        style={styles.containerForTextAndIcon}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.userAndAdminNames}>{mainTitle}</Text>

        <ArrowUpDown onPress={() => setIsOpen(!isOpen)} expanded={isOpen} />
      </TouchableOpacity>
      {isOpen &&
        Object.entries(optionsList).map(([key, value]) => (
          <TouchableOpacity
            onPress={() => onPress(key)}
            style={dropdownStyle(isOpen)}
          >
            <Text style={{ ...typography.button.sm }}>Välj datum</Text>
          </TouchableOpacity>
        ))}
    </View>
  );
};
const styles = StyleSheet.create({
  containerForTextAndIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    ...typography.b1,
    paddingVertical: 14,
  },
  userAndAdminNames: {
    ...typography.b2,
  },
});
const dropdownStyle = (
  openDropDown: boolean,
): StyleProp<FlexStyle | TextStyle> => ({
  flexDirection: "row",
  height: 50,
  backgroundColor: colors.background,
  borderRadius: 5,
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderWidth: 1,
  borderColor: openDropDown ? colors.dark : colors.background,
  ...Platform.select({
    ios: {
      shadowOffset: {
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 1,
    },
    android: {
      elevation: 2,
    },
  }),
});
