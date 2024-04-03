import React, { useState } from "react";
import {
 StyleSheet,Text,TouchableOpacity,View
} from "react-native";
import colors from "../../assets/theme/colors";
import typography from "../../assets/theme/typography";

type Props ={
    onEditPress:()=> void;
    onDeletetPress:()=> void;
  }

export const ChatCardEditMenu = ({onEditPress,onDeletetPress}:Props) => {
    const [showMenu,setShowMenu]=useState(false)

    const toggleMenu=()=>{
        setShowMenu(!showMenu)
    }
  
    const handleEditPress=()=>{
        toggleMenu()
        onEditPress()
    }
    
    const handleDeletePress=()=>{
        toggleMenu()
        onDeletetPress()
    }
  return (
   <View style={styles.container}>
    <TouchableOpacity onPress={toggleMenu}>
        <Text style={styles.buttonText}>...</Text>
    </TouchableOpacity>
    {showMenu && (
        <View style={styles.menu}>
            <TouchableOpacity onPress={handleEditPress}>
                <Text style={styles.menuItem}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDeletePress}>
                <Text style={styles.menuItem}>Delete</Text>
            </TouchableOpacity>
        </View>
    )}
   </View> 
  );
};

const styles = StyleSheet.create({
    container:{
        position:'relative'
    },
    menu:{
        backgroundColor: colors.background,
    },
    buttonText:{
        color:colors.dark,
        ...typography.h3
    },
    menuItem:{
        color:colors.dark,
        ...typography.b2,
        marginRight: 10,
    }
});

