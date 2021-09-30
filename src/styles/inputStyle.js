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
          height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
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
