import { FlexStyle, StyleProp,  StyleSheet,  Text, TextStyle, TouchableOpacity, View } from "react-native";
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
export const DropDownOverlay = ({ optionsList,style }: Props) => {
  return (
    <View style={[style,styles.dropdown, ]}>
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
    ...shadow({ shadowOpacity: 0.2, shadowOffsetHeight: 2 }),
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomWidth: 5,
    borderBottomColor: colors.background,
   
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'pink', 
  },
});