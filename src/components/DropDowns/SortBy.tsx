import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Sort } from "../../lib/enums/sort";
import { shadow } from "../../styles/shadows";
import colors from "../../assets/theme/colors";

type Props = {
  setSortBy: (sort: Sort) => void;
};

export const SortBy = ({ setSortBy }: Props) => {
  return (
    <View style={styles.dropdown}>
      {Object.entries(Sort).map(([key, value]) => (
        <TouchableOpacity
          key={key}
          onPress={() => {
            setSortBy(value);
          }}
        >
          <View style={styles.dropdownItem}>
            <Text testID={`inside-sort-by-dropdown-${key}`}>{value}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    width: "100%",
    position: "absolute",

    top: 45,
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
  },
});
