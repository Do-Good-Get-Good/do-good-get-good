import { Icon } from "@rneui/base";
import { TextStyle, ViewStyle } from "react-native";
import colors from "../theme/colors";

type Props = {
  onPress?: () => void;
  style?: ViewStyle | TextStyle | undefined;
};

export const BuildingIcon = ({ onPress, style }: Props) => {
  return (
    <Icon
      onPress={() => onPress && onPress()}
      type="font-awesome"
      name="building-o"
      color={colors.dark}
      size={23}
      style={style}
    />
  );
};
