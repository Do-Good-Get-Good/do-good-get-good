import { StyleSheet, Text, View } from "react-native";
import colors from "../../assets/theme/colors";
import { TextUnderlineButton } from "../Buttons/TextUnderlineButton";
import typography from "../../assets/theme/typography";

type Props = {
  onPress: () => void;
};

export const ForgotPasswordTextAndButton = ({ onPress }: Props) => {
  return (
    <View style={styles.passReset}>
      <Text style={styles.text}>Glömt ditt lösenord?</Text>
      <TextUnderlineButton
        title="Tryck här"
        onPress={onPress}
        styleText={styles.button}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  passReset: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  text: {
    color: "#333333",
    marginRight: 4,
    ...typography.b2,
    alignSelf: "center",
  },
  button: { color: colors.primary },
});
