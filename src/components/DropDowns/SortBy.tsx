import {  Text, TouchableOpacity, View } from "react-native";
import { Sort } from "../../lib/enums/sort";

import { dropDownStyle } from "../../styles/dropDownStyle";

type Props = {
  setSortBy: (sort: Sort) => void;
};

export const SortBy = ({ setSortBy }: Props) => {
  return (
    <View style={dropDownStyle.dropdown}>
      {Object.entries(Sort).map(([key, value]) => (
        <TouchableOpacity
          key={key}
          onPress={() => {
            setSortBy(value);
          }}
        >
          <View style={dropDownStyle.dropdownItem}>
            <Text testID={`inside-sort-by-dropdown-${key}`}>{value}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

