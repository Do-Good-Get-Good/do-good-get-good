import {
  FlexStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import { Icon } from "@rneui/base";
import colors from "../../assets/theme/colors";
import typography from "../../assets/theme/typography";
import { useNavigation } from "@react-navigation/native";

type Props = {
  onPress?: () => void;
  style?: StyleProp<FlexStyle | TextStyle>;
};
export const GoBackButton = ({ onPress, style }: Props) => {
  const navigation = useNavigation();

  const onGoBackPressed = () => {
    navigation.goBack();
    onPress && onPress();
  };
  return (
    <TouchableOpacity
      testID="goBackButton"
      onPress={() => onGoBackPressed()}
      style={[style, styles.container]}
    >
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
  container: {
    flexDirection: "row",
  },
  textGoBackButton: {
    marginLeft: 10,
    paddingTop: 4,
    textDecorationLine: "underline",
    fontWeight: "500",
    ...typography.b2,
  },
});
