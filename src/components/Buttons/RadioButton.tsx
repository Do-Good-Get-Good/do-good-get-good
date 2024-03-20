import { StyleSheet, Text, TouchableOpacity,View } from "react-native";

import colors from "../../assets/theme/colors";
import typography from "../../assets/theme/typography";
import { useState } from "react";

type Props = {
    label?:string,
    onPress?: () => void;
    selected?: boolean;
    style?: any;
};
export const RadioButton = ({ label,onPress,selected }:Props) => {
    const [selectedOption, setSelectedOption] = useState<boolean | null>(null);
    // const [selectedOption, setSelectedOption] = useState<boolean>(selected || false);

    const handleSelectOption = (value: boolean) => {
      setSelectedOption(value);
    };

  return (
    <View style={styles.labelStyle}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={onPress} style={styles.touchable}>
        <View style={[styles.radioButton, selected && styles.selected]}>
          {selected && <View style={styles.smallCircle} />}
        </View>
      </TouchableOpacity>
    </View>
     
  );
};
const styles = StyleSheet.create({
    
      labelStyle: {
        flexDirection: 'row',
        marginLeft: 10,
      },
      label: {
        ...typography.b2
      },
      touchable: {
        marginLeft:2, 
      },
      radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.dark,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
      },
      smallCircle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        margin: 4,
        backgroundColor: colors.dark,
      },
      selected:{
        backgroundColor: colors.primary
      }
  
});
