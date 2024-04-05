import React, { useState } from "react";
import {
  Alert,
 StyleSheet,Text,TouchableOpacity,View
} from "react-native";
import colors from "../../assets/theme/colors";
import typography from "../../assets/theme/typography";
import { DropDownOverlay } from "../DropDowns/DropDownOverlay";

type Props ={ 
    onDeletetPress:()=> void;
  }

export const ChatCardEditMenu = ({onDeletetPress}:Props) => {
    const [showMenu,setShowMenu]=useState(false)   

  const optionsList =[{
    label: 'Delete',
    onPress: () => {
      onDeletetPress();
      setShowMenu(false); 
    }
  }
]
  
  return (
    <TouchableOpacity  onPress={()=> setShowMenu(!showMenu)}>
        <Text style={styles.buttonText}>...</Text>
        {showMenu &&< DropDownOverlay optionsList={optionsList} style={styles.dropDownContainer} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    buttonText:{
        color:colors.dark,
        ...typography.h3
    },
    dropDownContainer:{
      top:5,
      position: 'relative',
      backgroundColor:colors.background,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5
    },
});

