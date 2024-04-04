import React from "react";
import {
  Alert,
  Animated,
  SafeAreaView,ScrollView,StatusBar,StyleSheet,Text
} from "react-native";
import { ChatCard } from "../components/ChartCard/ChatCard";
import BottomLogo from '../components/BottomLogo';
import Menu from '../components/Menu';
import typography from "../assets/theme/typography";
import { LongButton } from "../components/Buttons/LongButton";
import { TextInput } from "react-native";
import colors from "../assets/theme/colors";
import { Comment, UserPost } from "../utility/types";
const sampleImageUrl = 'https://st2.depositphotos.com/2001755/5443/i/450/depositphotos_54431143-stock-photo-beautiful-landscape.jpg'
const comments:Comment[] =[
  {id:'1',comment:"Fitst comment",userID:'user1'},
  {id:'2',comment:"Second comment",userID:'user2'},
  {id:'3',comment:" Third comment ",userID:'user1'}]

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

const samplePost:UserPost = {
  id: "1",
  userID: "user1",
  userFirstName: "John",
  userLastName: "Johansson",
  activityID: "activity1",
  activityCity: "Göteborg",
  activityTitle: "Blodgivning",
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
  
  return (
    <SafeAreaView style={styles.container}>
        <Menu/>
      <Animated.ScrollView contentContainerStyle={styles.scrollViewContent}>
    
      <ChatCard post={samplePost}
users={users} /> 
      <LongButton style={styles.longButton} title="Lägg till upplevelse" onPress={()=>(Alert.alert("LongButton Pressed"))}/>
      <TextInput
      style={styles.inputField}
      placeholder="Skriv ett meddelande"/>
      <BottomLogo/>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
  
  },
  // headerText: {
  //   ...typography.h2,
  //   fontWeight: '500',
  //   marginTop: 30,
  // },
  scrollViewContent: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,

},
  longButton:{
   //   alignItems:'center',
      borderRadius:5,
      marginRight:50,
      height:40,
      marginLeft:50 
   },
   inputField:{
   // justifyContent:'center',
    borderWidth:1,
    padding:6,
    margin:10,
    backgroundColor:colors.background,
    borderColor:colors.dark,
    color:colors.dark
   }


});

