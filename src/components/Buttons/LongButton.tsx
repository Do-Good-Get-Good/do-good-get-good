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
};

const containerStyle = (
  color: string = colors.primary,
): StyleProp<FlexStyle | TextStyle> => ({
  borderRadius: 5,
  backgroundColor: color,
  height: 50,

  alignItems: "center",
  justifyContent: "center",
  marginTop: 50,
  marginBottom: 144,
});

const textStyle = (): StyleProp<TextStyle> => ({
  ...typography.button.lg,
  fontWeight: "500",
});

export const LongButton = ({ title, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={containerStyle()}>
      <Text style={textStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};
