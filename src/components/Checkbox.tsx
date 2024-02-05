import BouncyCheckbox from "react-native-bouncy-checkbox";
import colors from "../assets/theme/colors";
import { Platform, StyleSheet, View } from "react-native";
import { shadow } from "../styles/shadows";

type Props = {
  checked: boolean;
  onCheck: () => void;
};

export const Checkbox = ({ onCheck, checked }: Props) => {
  return (
    <BouncyCheckbox
      testID="checkbox"
      style={{ flex: 0.07 }}
      size={20}
      fillColor={colors.primary}
      unfillColor={colors.background}
      iconStyle={styles.iconStyle}
      innerIconStyle={styles.innerIconStyle}
      isChecked={checked}
      onPress={onCheck}
    />
  );
};
const styles = StyleSheet.create({
  iconStyle: {
    borderColor: colors.primary,
    borderRadius: 5,
    ...shadow({}),
  },
  innerIconStyle: { borderWidth: 0.7, borderRadius: 5 },
});
