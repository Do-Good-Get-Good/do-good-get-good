import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
};

export const TextUnderlineButton = ({ title, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.textAsButton}>{title}</Text>
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
