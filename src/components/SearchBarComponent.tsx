import React, { useState } from "react";
import {
  Platform,
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { SearchIcon } from "../assets/icons/SearchIcon";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";

type Props<T> = {
  style?: StyleProp<ViewStyle>;
  keys: Array<keyof T>;
  arrayToSearch: Array<T>;
  onSearch: (value: Array<T>) => void;
};

function search<T>(input: string, data: T[], keys: Array<keyof T>) {
  return data.filter((item) => {
    let valuesOfAllKeys = "";
    keys.forEach((key) => (valuesOfAllKeys += " " + `${item[key]}`));
    return findByKey(input, valuesOfAllKeys);
  });
}

const findByKey = (input: string, value: string) => {
  const inputWords = input.trim().toLowerCase().split(" ");
  const valueWords = value.trim().toLowerCase().split(" ");

  return inputWords.every((inputWord) =>
    valueWords.some((valueWord) => valueWord.startsWith(inputWord)),
  );
};

export const SearchBarComponent = <T,>({
  arrayToSearch,
  style,
  keys,
  onSearch,
}: Props<T>) => {
  const [value, setValue] = useState("");

  const onChangeText = (word: string) => {
    onSearch(search(word, arrayToSearch, keys));
    setValue(word);
  };

  return (
    <View style={[styles.container, style]}>
      <TextInput
        testID="searchbar-input"
        returnKeyType="search"
        style={styles.textInput}
        onChangeText={(word) => arrayToSearch && onChangeText(word)}
        value={value}
        placeholder="Sök"
      />
      <SearchIcon testID="search-button-pressed" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.background,
    borderRadius: 5,
    height: 55,

    ...Platform.select({
      ios: {
        shadowOffset: {
          height: 2,
          width: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
        shadowColor: colors.dark,
      },
    }),
  },
  textInput: {
    flex: 1,
    paddingLeft: 15,
    ...typography.b1,
  },
});
