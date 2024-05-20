import React, { useState } from "react";
import {
  StyleSheet,TextInput,View
} from "react-native";
import colors from "../assets/theme/colors";
import typography from "../assets/theme/typography";
import { ArrowUpward } from "../assets/icons/ArrowUpward";

type Props ={
    onSubmit: (text: string) => void;
  }
  const placeholder="Skriv en kommentar"
  export const InputField = ({onSubmit }: Props) => {
  const [textInputValue, setTextInputValue] = useState('');

    const onSubmitComment = () => {
      textInputValue.trim() !== '' && (onSubmit(textInputValue), setTextInputValue(''));
    };
    return (
      <View style={styles.container}>
        <TextInput
          placeholder={placeholder}
          value={textInputValue}
          onChangeText={setTextInputValue}
           style={styles.input}
        />
        <ArrowUpward style={styles.buttonArrow} onPress={onSubmitComment} />
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
      marginVertical:20,
      backgroundColor: colors.background,
    },
    input: {
      flex: 1, 
      paddingVertical: 8, 
      fontFamily: typography.b1.fontFamily,
    },
    buttonArrow: {
      padding: 2,
       borderWidth: 0.75,
      borderRadius: 5,
      marginLeft: 5, 
    },
  });
  