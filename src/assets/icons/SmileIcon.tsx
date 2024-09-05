import { Icon } from "@rneui/base";
import { TextStyle, ViewStyle } from "react-native";
import colors from "../theme/colors";

type Props = {
  testID?: string;
  onPress?: () => void;
  style?: ViewStyle | TextStyle;
};

export const SmileIcon = ({ onPress, style, testID = "" }: Props) => {
  return (
    <Icon
      style={style}
      testID={`smile-icon${testID}`}
      color={colors.secondary}
      type="feather"
      name="smile"
      size={24}
      onPress={() => onPress && onPress()}
    />
  );
};
