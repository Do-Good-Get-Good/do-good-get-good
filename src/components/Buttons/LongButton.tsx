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
};

const containerStyle = (
  color: string = colors.primary,
): StyleProp<FlexStyle | TextStyle> => ({
  borderRadius: 5,
  backgroundColor: color,
  height: 50,

  alignItems: "center",
  justifyContent: "center",
});

const textStyle = (): StyleProp<TextStyle> => ({
  ...typography.button.lg,
  fontWeight: "500",
});

export const LongButton = ({ title, onPress, style }: Props) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[containerStyle(), style]}
    >
      <Text style={textStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};
