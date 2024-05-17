import { Icon } from "@rneui/base";
import { TextStyle, ViewStyle } from "react-native";
import colors from "../theme/colors";

type Props = {
  onPress?: () => void;
  style?: ViewStyle | TextStyle | undefined;
};

export const MapMarkerIcon = ({ onPress, style }: Props) => {
  return (
    <Icon
      style={style}
      onPress={() => onPress && onPress()}
      type="material-community"
      name="map-marker-outline"
      color={colors.dark}
      size={25}
    />
  );
};
