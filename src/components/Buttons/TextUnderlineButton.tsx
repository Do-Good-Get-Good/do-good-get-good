import { StyleSheet, Text, TextStyle, TouchableOpacity } from "react-native";

type Props = {
  testID?: string;
  title: string;
  onPress: () => void;
  styleText?: TextStyle;
};

export const TextUnderlineButton = ({
  title,
  onPress,
  testID,
  styleText,
}: Props) => {
  return (
    <TouchableOpacity testID={testID} style={{ alignSelf: "baseline" }}>
      <Text onPress={onPress} style={[styles.textAsButton, styleText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  textAsButton: {
    textDecorationLine: "underline",
    fontWeight: "700",
    paddingVertical: 10,
  },
});
