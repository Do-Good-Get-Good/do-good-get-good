import { Icon } from "@rneui/base";
import { TextStyle, ViewStyle } from "react-native";
import colors from "../theme/colors";

type Props = {
  testID?: string;
  onPress?: () => void;
  style?: ViewStyle | TextStyle;
};

export const Pencil = ({ onPress, style, testID = "" }: Props) => {
  return (
    <Icon
      style={style}
      testID={`pencil-icon${testID}`}
      color={colors.secondary}
      type="material-community"
      name="pencil-outline"
      size={25}
      onPress={() => onPress && onPress()}
    />
  );
};
