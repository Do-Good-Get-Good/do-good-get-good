import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import {
  FlexStyle,
  TextStyle,
} from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import colors from "../assets/theme/colors";

export const borderStyle = (
  isError: boolean = false
): StyleProp<FlexStyle | TextStyle> => ({
  borderRadius: 5,
  borderWidth: 1,
  borderColor: isError ? colors.error : colors.background,
});
