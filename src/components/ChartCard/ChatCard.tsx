import React from "react";
import {StyleSheet,View,Text
} from "react-native";
import { ChatCardHeader } from "./ChatCardHeader";

import { shadows } from "../../styles/shadows";
import colors from "../../assets/theme/colors";
import { ChatCardImage } from "./ChartCardImage";



export const ChatCard = () => {
  const sampleImageUrl = 'https://st2.depositphotos.com/2001755/5443/i/450/depositphotos_54431143-stock-photo-beautiful-landscape.jpg'


  const samplePost = {
    id: "1",
    userID: "user1",
    userFirstName: "John",
    userLastName: "Johansson",
    activityID: "activity1",
    activityCity: "Göteborg",
    activityTitle: "Blodgivning",
    changed: false,
    date: new Date(),
    description: "Det var so roligt!",
    emoji: [],
    imageURL: "symbol_hands_heart-DEFAULT",
    comments: [],
  };
    
  return (
      <View style={styles.cardContainer}>
        <ChatCardHeader post={samplePost}/>
        <ChatCardImage imageUrl={sampleImageUrl}/>  
      </View> 
  );
};

const styles = StyleSheet.create({
    cardContainer:{
     ... shadows.cardShadow,
      maxHeight: '70%',
      maxWidth:'80%',
      backgroundColor: colors.background,
      borderRadius:5,
    },
    
});
