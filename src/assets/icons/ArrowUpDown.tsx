import { Icon } from "@rneui/base";
import { TextStyle, ViewStyle } from "react-native";

type Props = {
  onPress?: () => void;
  expanded: boolean;
  style?: ViewStyle | TextStyle | undefined;
};

export const ArrowUpDown = ({ onPress, expanded = false, style }: Props) => {
  return (
    <Icon
      style={style}
      testID={`${expanded ? "arrow-drop-up" : "arrow-drop-down"}-icon`}
      color="#5B6770"
      name={expanded ? "arrow-drop-up" : "arrow-drop-down"}
      size={30}
      onPress={() => onPress && onPress()}
    />
  );
};
