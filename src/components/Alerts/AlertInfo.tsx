import { Alert } from "react-native";

export const AlertInfo = (
  info: string,
  onPressYes?: () => void,
  title?: string,
) =>
  Alert.alert(title ?? "", info, [
    {
      text: "Ok",
      onPress: () => onPressYes && onPressYes(),
    },
  ]);
