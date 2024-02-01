import {
  FlexStyle,
  StyleProp,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import typography from "../../assets/theme/typography";
import { Text } from "react-native";
import colors from "../../assets/theme/colors";

type Props = {
  title: string;
  onPress: () => void;
  style?: StyleProp<FlexStyle | TextStyle>;
  isDisabled?: boolean;
};

const containerStyle = (
  isDisabled: boolean = false,
  color: string = colors.primary,
): StyleProp<FlexStyle | TextStyle> => ({
  borderRadius: 5,
  backgroundColor: isDisabled ? colors.disabled : color,
  height: 50,

  alignItems: "center",
  justifyContent: "center",
});

const textStyle = (isDisabled: boolean = false): StyleProp<TextStyle> => ({
  ...typography.button.lg,
  fontWeight: "500",
  color: isDisabled ? colors.secondary : colors.dark,
});

export const LongButton = ({ title, onPress, style, isDisabled }: Props) => {
  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={() => onPress()}
      style={[containerStyle(isDisabled), style]}
    >
      <Text style={textStyle(isDisabled)}>{title}</Text>
    </TouchableOpacity>
  );
};
