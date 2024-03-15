import React from "react";
import {
  SafeAreaView,StyleSheet,Text
} from "react-native";
import { ChatCardHeader } from "./ChatCardHeader";

export const ChatCard = () => {

  const samplePost = {
    id: "1",
    userID: "user1",
    userFirstName: "John",
    userLastName: "Johansson",
    activityID: "activity1",
    activityCity: "Malmo",
    activityTitle: "Blodgivning",
    changed: false,
    date: new Date(),
    description: "Det var so roligt!",
    emoji: [],
    imageURL: "",
    comments: [],
  };
  
  
  return (
    <SafeAreaView>
      <Text  style={styles.paragraph}> ChatCard!</Text>
      <ChatCardHeader post={samplePost} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    paragraph:{
        textAlign: 'center'
    } 
});
