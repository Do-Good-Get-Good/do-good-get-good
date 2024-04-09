import React from "react";
import {
  View,StyleSheet,Text,Image, Dimensions
} from "react-native";

type Props ={
    imageUrl: string;
  }
  const screenHeight = Dimensions.get('window').height
  const screenWidth = Dimensions.get('window').width

export const ChatCardImage = ({imageUrl}: Props) => {

  return (
    <Image  source={{ uri: imageUrl }} style={styles.image} />
  );
};

const styles = StyleSheet.create({
  image:{
        minWidth:screenWidth /2.3,
        minHeight:screenHeight /2.3,
        resizeMode:'contain',
  }
});
