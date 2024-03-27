import React from "react";
import {
  View,StyleSheet,Text,Image
} from "react-native";


type Props ={
    imageUrl: string;
  }
  

export const ChatCardImage = ({imageUrl}: Props) => {
  
  return (
    <Image  source={{ uri: imageUrl }} style={styles.image} />
  );
};

const styles = StyleSheet.create({
  image:{
        minWidth: "50%",
        minHeight:"50%",
        resizeMode:'contain',
  }

});
