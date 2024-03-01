import { Platform, ViewStyle } from "react-native";
import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
type Props = {
  shadowOpacity?: number;
  shadowRadius?: number;
  elevation?: number;
  shadowOffsetHeight?: number;
};

export const shadow = ({
  shadowOpacity = 0.3,
  shadowRadius = 1,
  elevation = 1,
  shadowOffsetHeight = 0.8,
}: Props) => ({
  ...Platform.select({
    ios: {
      shadowOffset: {
        height: shadowOffsetHeight,
      },
      shadowOpacity: shadowOpacity,
      shadowRadius: shadowRadius,
    },
    android: {
      elevation: elevation,
    },
  }),
});
