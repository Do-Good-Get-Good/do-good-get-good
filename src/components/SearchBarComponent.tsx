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
import { Activity, User } from "../utilily/types";

type Props<T> = {
  style?: StyleProp<ViewStyle>;
  keys: Array<keyof T>;
  arrayToSearch: Array<T>;
};

function search<T>(input: string, data: T[], keys: Array<keyof T>) {
  //   return data.filter((item) =>  item[key].toLowerCase().includes(query.toLowerCase()))

  const d = data.filter((item) =>
    keys.map((key) => findByKey(input, item[key] as string)),
  );
  //   console.log(input, " .  input");
  //   console.log(d.length, " .       ------d");
  //   console.log(data.length, " .       ------data.");
  return d;
}

const findByKey = (value: string, key: string) => {
  const f = key.toLowerCase().includes(value.toLowerCase());

  console.log(value, " .       ------value");
  console.log(key, " .       ------ key");

  console.log(f, " .      f ");
  return f;
};

export const SearchBarComponent = <T,>({
  arrayToSearch,
  style,
  keys,
}: Props<T>) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        // onSubmitEditing={() => searchWordButtonPressed()}
        returnKeyType="search"
        style={styles.textInput}
        onChangeText={(word) => search(word, arrayToSearch, keys)}
        //  value={word}
        placeholder="Sök"
      />
      <View style={styles.lineNearIcon} />
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
  lineNearIcon: {
    width: 1,
    height: 55,
    borderLeftWidth: 1,
    borderColor: colors.dark,
    opacity: 0.18,
  },
});
