import { Alert } from "react-native";

type Props = {
  title: string;
  question: string;
  onPressNo: () => void;
  onPressYes: () => void;
};

export const AlertQuestion = ({
  title,
  question,
  onPressNo,
  onPressYes,
}: Props) =>
  Alert.alert(title, question, [
    {
      text: "Nej",
      onPress: () => onPressNo(),
    },
    {
      text: "Ja",
      onPress: () => onPressYes(),
    },
  ]);
