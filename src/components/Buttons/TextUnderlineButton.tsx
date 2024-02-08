import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  testID?: string;
  title: string;
  onPress: () => void;
};

export const TextUnderlineButton = ({ title, onPress, testID }: Props) => {
  return (
    <TouchableOpacity testID={testID} style={{ alignSelf: "baseline" }}>
      <Text onPress={onPress} style={styles.textAsButton}>
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
