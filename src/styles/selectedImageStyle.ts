import { ImageStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import colors from "../assets/theme/colors";

export const selectedImageStyle = (selected: boolean): ImageStyle => {
  return {
    flex: 1,
    flexDirection: "row",
    resizeMode: "cover",
    backgroundColor: colors.background,
    alignItems: "center",
    borderRadius: 5,
    height: 150,
    width: 150,
    marginHorizontal: 5,
    borderWidth: selected ? 7 : 1,
    borderColor: colors.primary,
  };
};
