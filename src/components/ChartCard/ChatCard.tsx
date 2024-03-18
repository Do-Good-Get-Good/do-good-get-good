import React from "react";
import {StyleSheet,View,Text
} from "react-native";
import { ChatCardHeader } from "./ChatCardHeader";

import { shadows } from "../../styles/shadows";
import colors from "../../assets/theme/colors";


export const ChatCard = () => {

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
    imageURL: "",
    comments: [],
  };
    
  return (
      <View style={styles.cardContainer}>
        <ChatCardHeader post={samplePost}/>
      </View> 
  );
};

const styles = StyleSheet.create({
    paragraph:{
        textAlign: 'center'
    } ,
    cardContainer:{
     ... shadows.cardShadow,
      maxHeight: '70%',
      maxWidth:'85%',
      backgroundColor: colors.background,
      borderRadius:5
    }  
});
