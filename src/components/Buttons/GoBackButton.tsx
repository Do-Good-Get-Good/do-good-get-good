import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/base";
import colors from "../../assets/theme/colors";
import typography from "../../assets/theme/typography";

type Props = {
  onPress: () => void;
};
export const GoBackButton = ({ onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ flexDirection: "row" }}>
      <Icon
        color={colors.dark}
        name="arrow-left"
        type="material-community"
        size={25}
      />
      <Text style={styles.textGoBackButton}>Gå tillbaka</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  textGoBackButton: {
    marginLeft: 10,
    paddingTop: 4,
    textDecorationLine: "underline",
    fontWeight: "500",
    ...typography.b2,
  },
});
