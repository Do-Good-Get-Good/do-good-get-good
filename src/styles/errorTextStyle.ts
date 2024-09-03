import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import {
  FlexStyle,
  TextStyle,
} from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import colors from "../assets/theme/colors";

export const errorTextStyle = (): StyleProp<FlexStyle | TextStyle> => ({
  color: colors.error,
  marginTop: 1,
});
