import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import colors from "../assets/theme/colors";
import {
  FlexStyle,
  TextStyle,
} from "react-native/Libraries/StyleSheet/StyleSheetTypes";
export const errorTextStyle = (): StyleProp<FlexStyle | TextStyle> => ({
  color: colors.error,
  marginTop: 1,
});
