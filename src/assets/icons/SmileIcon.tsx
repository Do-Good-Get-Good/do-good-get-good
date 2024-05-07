
import { Icon } from "@rneui/base";
import colors from "../theme/colors";
import { TextStyle, ViewStyle } from "react-native";

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
      size={30}
      onPress={() => onPress && onPress()}
    />
  );
};
