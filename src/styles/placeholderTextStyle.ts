import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";
import { Platform } from "react-native";

import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import {
  DimensionValue,
  FlexStyle,
  TextStyle,
} from "react-native/Libraries/StyleSheet/StyleSheetTypes";

export const placeholderTextStyle = (): StyleProp<FlexStyle | TextStyle> => ({
  paddingVertical: 16,
  paddingLeft: 12,
  marginTop: 10,
  width: "100%",
  fontSize: typography.b1.fontSize,
  fontFamily: typography.b1.fontFamily,
  color: colors.dark,
  backgroundColor: colors.background,
  ...Platform.select({
    ios: {
      shadowOffset: {
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1,
    },
    android: {
      elevation: 2,
    },
  }),
});
