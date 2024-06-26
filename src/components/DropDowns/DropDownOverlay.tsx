import {
  FlexStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../assets/theme/colors";
import { shadow } from "../../styles/shadows";

export type Option = {
  label: string;
  onPress: () => void;
};

type Props = {
  style?: StyleProp<FlexStyle | TextStyle>;
  optionsList: Option[];
};
export const DropDownOverlay = ({ optionsList, style }: Props) => {
  return (
    <View style={[style, styles.dropdown]}>
      {optionsList.map((optionItem, index) => (
        <TouchableOpacity
          key={index}
          onPress={optionItem.onPress}
          testID={`dropdown-overlay-${optionItem.label.toLowerCase()}`}
        >
          <View style={styles.dropdownItem}>
            <Text>{optionItem.label}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
export const styles = StyleSheet.create({
  dropdown: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    ...shadow({ shadowOpacity: 0.3, shadowRadius: 3, shadowOffsetHeight: 3 }),
    borderRadius: 5,
    borderWidth: 5,
    borderColor: colors.background,
    top: 30,
    right: 5,
    minWidth: 100,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});
