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
export const InputField = ({placeholder,value,onChangeText,onSubmit}: Props) => {
  
  return (
    <View style={styles.container}>
    <TextInput
       placeholder={placeholder}
       value={value}
       onChangeText={onChangeText}
    /> 
    <View>
    <TouchableOpacity onPress={onSubmit}>
        <Icon style={styles.buttonArrow} name="arrow-upward" size={20}/>
    </TouchableOpacity>
    </View>
    
    </View>  
  );
};

const styles = StyleSheet.create({
    container:{
        flexDirection:'row'
    },
    buttonArrow:{
        padding:2,
        backgroundColor:colors.primary,
        borderRadius:5,
        marginLeft:100
    }

});
