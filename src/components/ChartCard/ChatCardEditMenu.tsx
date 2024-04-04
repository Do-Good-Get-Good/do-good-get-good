import React, { useState } from "react";
import {
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
    onPress:()=>   onDeletetPress()
  }
]
  
  return (
    <TouchableOpacity  onPress={()=> setShowMenu(!showMenu)}>
        <Text style={styles.buttonText}>...</Text>
        {showMenu &&< DropDownOverlay optionsList={optionsList} />
    }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

