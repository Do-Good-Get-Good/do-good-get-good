import React, { useRef } from "react";
import {
  Alert,
  SafeAreaView,ScrollView,StyleSheet
} from "react-native";
import { ChatCard } from "../components/ChartCard/ChatCard";
import BottomLogo from '../components/BottomLogo';
import Menu from '../components/Menu';
import typography from "../assets/theme/typography";
import { LongButton } from "../components/Buttons/LongButton";
import { TextInput } from "react-native";
import colors from "../assets/theme/colors";
import {Comment, UserPost } from "../utility/types";
const sampleImageUrl = 'https://st2.depositphotos.com/2001755/5443/i/450/depositphotos_54431143-stock-photo-beautiful-landscape.jpg'
const comments:Comment[] =[
  {id:'1',comment:"Fitst comment",userID:'user1'},
  {id:'2',comment:"Second comment",userID:'user2'},
  {id:'3',comment:" Third commentvxfbfghgfjhjkhlk.;lk/l;",userID:'user1'}]

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

const samplePost:UserPost = {
  id: "1",
  userID: "user1",
  userFirstName: "John",
  userLastName: "Johansson",
  activityID: "activity1",
  activityCity: "Göteborg",
  activityTitle: "Blodgivining",
  changed: false,
  date: yesterday,
  description: "Det var so roligt!",
  emoji: [],
  imageURL: sampleImageUrl,
  comments: comments,
};
const users= [
  { 
    id: "user1", 
    activitiesAndAccumulatedTime: [],
    connectedActivities: [],
    firstName: "Erik",
    lastName: "Andersson",
    statusActive: true 
  },
  { 
    id: "user2", 
    activitiesAndAccumulatedTime: [],
    connectedActivities: [],
    firstName: "Jerom",
    lastName: "Karlsson",
    statusActive: false 
  }
];

export const Chat = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };
  return (
    <SafeAreaView style={styles.container}>
     <ScrollView
      ref={scrollViewRef}
      onContentSizeChange={scrollToBottom}
     contentContainerStyle={styles.scrollViewContent}>
      <Menu/>
      <ChatCard post={samplePost} users={users} /> 
      <LongButton style={styles.longButton} title="Lägg till upplevelse" onPress={()=>(Alert.alert("LongButton Pressed"))}/>
      <TextInput
      style={styles.inputField}
      placeholder="Skriv ett meddelande"/>
      <BottomLogo/>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 100,
    justifyContent: 'flex-end'
},
  longButton:{
    marginTop:20,
      borderRadius:5,
      marginRight:50,
      height:40,
      marginLeft:50,
      marginBottom:20
   },
   inputField:{
    borderWidth:1,
    padding:6,
    margin:2,
    marginRight:30,
    marginLeft:20,
    backgroundColor:colors.background,
    borderColor:colors.dark,
    color:colors.dark
   }
});

