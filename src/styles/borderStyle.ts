import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import colors from "../assets/theme/colors";
import {
  FlexStyle,
  TextStyle,
} from "react-native/Libraries/StyleSheet/StyleSheetTypes";
export const borderStyle = (
  isEror: boolean = false,
): StyleProp<FlexStyle | TextStyle> => ({
  borderRadius: 5,
  borderWidth: 1,
  borderColor: isEror ? colors.error : colors.background,
});
