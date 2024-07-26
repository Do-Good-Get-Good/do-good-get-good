import {
  FlexStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { ArrowUpDown } from "../../../assets/icons/ArrowUpDown";
import { useState } from "react";
import colors from "../../../assets/theme/colors";

type Props = {
  title: string;
  testID?: string;
  isUnderlineOnPress?: boolean;
  componentInsideDropDown: React.JSX.Element;
  openAsOverView?: boolean;
  containerstyle?: ViewStyle;
};

export const DropDownTextAndIcon = ({
  title,
  testID,
  isUnderlineOnPress = false,
  componentInsideDropDown,
  containerstyle,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const textWithUnderlineIfPressedStyle = (
    onPress: boolean = false,
  ): StyleProp<FlexStyle | TextStyle> => ({
    fontSize: 18,
    textDecorationLine: isUnderlineOnPress && onPress ? "underline" : "none",
  });

  return (
    <View style={{ ...styles.mainContainer, ...containerstyle }}>
      <TouchableOpacity
        testID={`dropdown-${testID}`}
        onPress={() => setIsOpen(!isOpen)}
        style={styles.container}
      >
        <Text
          testID={`dropdown-title-${testID}`}
          style={textWithUnderlineIfPressedStyle(isOpen)}
        >
          {title}
        </Text>

        <ArrowUpDown
          style={{ marginHorizontal: 5 }}
          onPress={() => setIsOpen(!isOpen)}
          expanded={isOpen}
        />
      </TouchableOpacity>
      {isOpen && componentInsideDropDown}
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.background,
    borderRadius: 5,
    borderWidth: 2,
    paddingVertical: 7,
    marginVertical: 7,
    borderColor: colors.background,
    flex: 1,
  },
  container: {
    paddingLeft: 15,

    paddingRight: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
