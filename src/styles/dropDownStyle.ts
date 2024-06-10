import { StyleSheet } from "react-native";
import { shadow } from "./shadows";
import colors from "../assets/theme/colors";

export const dropDownStyle = StyleSheet.create({
    dropdown: {
      width: "100%",
      position: "absolute",
      top: 45,
      backgroundColor: "#FFFFFF",
      ...shadow({ shadowOpacity: 0.2, shadowOffsetHeight: 2 }),
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      borderBottomWidth: 5,
      borderBottomColor: colors.background,
    },
    dropdownItem: {
      paddingHorizontal: 16,
      paddingVertical: 10,
    },
  });