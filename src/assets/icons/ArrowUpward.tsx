import { Icon } from "@rneui/base";
import { TextStyle, TouchableOpacity, ViewStyle } from "react-native";

type Props = {
  onPress?: () => void;
  style?: ViewStyle | TextStyle | undefined;
};

export const ArrowUpward = ({ onPress,  style }: Props) => {
  return (
    <TouchableOpacity  onPress={() => onPress && onPress()}>
    <Icon
      style={style}
      testID={'arrow-upward'}
      color="#5B6770"
      name="arrow-upward" size={20}  
    />
    </TouchableOpacity>
  );
};
