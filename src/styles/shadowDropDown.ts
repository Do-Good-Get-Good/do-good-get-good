import { Platform } from "react-native";
import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

import {
  FlexStyle,
  TextStyle,
} from "react-native/Libraries/StyleSheet/StyleSheetTypes";

export const shadowDropDown = () => ({
  ...Platform.select({
    ios: {
      shadowOffset: {
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1,
    },
    android: {
      elevation: 1,
    },
  }),
});
