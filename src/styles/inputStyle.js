import { StyleSheet } from "react-native";

const inputStyles = StyleSheet.create({
  textInput: {
    width: "100%",
    height: 49,
    backgroundColor: "#FFFFFF",
    paddingLeft: 15,
    fontWeight: "500",
    borderRadius: 5,
    fontSize: 18,
    color: "#333333",
    ...Platform.select({
      ios: {
        shadowOffset: {
          hight: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      android: {
        elevation: 1.5,
      },
    }),
  },
  textInputInvalid: {
    borderWidth: 1,
    borderColor: "#C62F25", //Red color
  },
  textInputValid: {
    borderWidth: 1,
    borderColor: "#84BD00", //Green color
  },
});

export default inputStyles;
