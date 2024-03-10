import { Icon } from "@rneui/base";
import colors from "../theme/colors";
import { TextStyle, ViewStyle } from "react-native";

type Props = {
  onPress?: () => void;
  style?: ViewStyle | TextStyle;
};

export const Pencil = ({ onPress, style }: Props) => {
  return (
    <Icon
      style={style}
      testID="pencil-icon"
      color={colors.secondary}
      type="material-community"
      name="pencil-outline"
      size={25}
      onPress={() => onPress && onPress()}
    />
  );
};
