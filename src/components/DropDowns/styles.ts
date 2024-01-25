import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

import {
  FlexStyle,
  TextStyle,
} from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import colors from "../../assets/theme/colors";

export const dropDownContainer: StyleProp<FlexStyle | TextStyle> = {
  backgroundColor: colors.background,
  paddingHorizontal: 14,
  marginTop: 10,
  borderRadius: 3,
};
