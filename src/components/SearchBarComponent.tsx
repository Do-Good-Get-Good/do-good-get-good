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
  onSearch: (value:Array<T>)=> void
};

function search<T>(input: string, data: T[], keys: Array<keyof T>) {
  
 const  h = data.filter((item) =>{
    let valuesOfAllKeys = ''
     keys.forEach((key) => valuesOfAllKeys +=  " " +`${item[key]}`)      
     return  findByKey(input, valuesOfAllKeys)

  }
  )

return h

}

const findByKey = (input: string, value: string) => {
  const v = value.trim().toLowerCase()
  const i = input.trim().toLowerCase()
return v.includes(i);
 
 
};



export const SearchBarComponent = <T,>({
  arrayToSearch,
  style,
  keys,
  onSearch

}: Props<T>) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        returnKeyType="search"
        style={styles.textInput}
        onChangeText={(word) => onSearch(search(word, arrayToSearch, keys)) }
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
