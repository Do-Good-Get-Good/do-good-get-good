import React from "react";
import {
  StyleSheet,TextInput,TouchableOpacity,View
} from "react-native";
import { Icon } from "@rneui/base";
import colors from "../assets/theme/colors";

type Props ={
    placeholder:string,
    value:string,
    onChangeText:(text:string)=>void;
    onSubmit?:()=>void;
   
  }
  export const InputField = ({ placeholder, value, onChangeText, onSubmit }: Props) => {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          style={styles.input}
        />
        <TouchableOpacity onPress={onSubmit} style={styles.buttonArrow}>
          <Icon name="arrow-upward" size={20} />
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.secondary,
      borderRadius: 5,
      paddingHorizontal: 10,
    },
    input: {
      flex: 1, 
      paddingVertical: 8, 
    },
    buttonArrow: {
      padding: 2,
      backgroundColor: colors.primary,
      borderRadius: 5,
      marginLeft: 5, 
    },
  });
  