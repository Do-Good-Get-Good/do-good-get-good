import { FlexStyle, StyleProp,  Text, TextStyle, TouchableOpacity, View } from "react-native";
import { dropDownStyle } from "../../styles/dropDownStyle";

type Option = {
    label: string;
    onPress: () => void;
  };
  
  type Props = {
    style?: StyleProp<FlexStyle | TextStyle>;
    optionsList: Option[];
  };
export const DropDownOverlay = ({ optionsList,style }: Props) => {
  return (
    <View style={[dropDownStyle.dropdown, style]}>
    {optionsList.map((optionItem, index) => (
      <TouchableOpacity
        key={index}
        onPress={optionItem.onPress}
        testID={`dropdown-overlay-${optionItem.label.toLowerCase()}`}
      >
        <View style={dropDownStyle.dropdownItem}>
          <Text>{optionItem.label}</Text>
        </View>
      </TouchableOpacity>
    ))}
  </View>
  );
};
