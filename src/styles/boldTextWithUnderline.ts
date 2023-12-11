import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";
import { TextStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

export const boldTextWithUnderline = (): StyleProp<TextStyle> => ({
  color: colors.dark,
  ...typography.button.sm,
  textDecorationLine: "underline",
  fontWeight: "bold",
});
