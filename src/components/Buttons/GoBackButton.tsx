import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import {
  FlexStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import colors from "../../assets/theme/colors";
import typography from "../../assets/theme/typography";

type Props = {
  onPress?: () => void;
  style?: StyleProp<FlexStyle | TextStyle>;
  text?: boolean;
};
export const GoBackButton = ({ onPress, style, text = true }: Props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      testID="goBackButton"
      onPress={() => {
        navigation.goBack();
        onPress && onPress();
      }}
      style={[style, styles.container]}
    >
      <Icon
        color={colors.dark}
        name="arrow-left"
        type="material-community"
        size={25}
      />
      {text && <Text style={styles.textGoBackButton}>Gå tillbaka</Text>}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 6,
  },
  textGoBackButton: {
    marginLeft: 10,
    paddingTop: 4,
    textDecorationLine: "underline",
    fontWeight: "500",
    ...typography.b2,
  },
});
