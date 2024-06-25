import { Alert } from "react-native";

export const AlertQuestion = (
  title: string,
  question: string,
  onPressYes: () => void,
  onPressNo?: () => void,
) =>
  Alert.alert(title, question, [
    {
      text: "Ja",
      onPress: () => onPressYes(),
    },
    {
      text: "Nej",
      onPress: onPressNo,
    },
  ]);
