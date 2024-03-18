import React from "react";
import { Icon } from "@rneui/base";
import colors from "../theme/colors";
import { TextStyle, ViewStyle } from "react-native";
type Props ={
  size?:number 
  style?: ViewStyle | TextStyle | undefined
}

export const LocationIcon = ({size = 25, style}:Props) => {
  
  return (
         <Icon
                  type="material-community"
                  name="map-marker-outline"
                  size={size}  
                  color={colors.dark} 
                  style={style}
                  />                 
  );
};
