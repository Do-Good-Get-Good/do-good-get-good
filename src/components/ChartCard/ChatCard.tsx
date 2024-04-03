import React, { useState } from "react";
import {StyleSheet,View,Text, Alert
} from "react-native";
import { ChatCardHeader } from "./ChatCardHeader";
import { shadows } from "../../styles/shadows";
import colors from "../../assets/theme/colors";
import { ChatCardImage } from "./ChatCardImage";
import { ChatCardDescription } from "./ChatCardDescription";
import { CommentsSection } from "./ChatComments/CommentsSection";
import { Comment } from "../../utility/types";
import { ChatCardEditMenu } from "./ChatCardEditMenu";
import { ChatCardDate } from "./ChatCardDate";

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
  const Users= [
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
  const Comments=[
    {id:'1',comment:"Fitst comment",userID:'user1'},
    {id:'2',comment:"Second comment",userID:'user2'},
    {id:'3',comment:" Third comment ",userID:'user1'}
  ]
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const handleEdit=()=>{
    Alert.alert("Edit button pressed")

  }
  const handleDelete=()=>{
    Alert.alert("Delete button pressed")
    
  }

  const handleAddComment = (newComment: string) => {
    if (newComment.trim() !== "") {
      const updatedComments = [
        ...allComments,
        {
          id: (allComments.length + 1).toString(),
          comment: newComment,
          userID: "user1",
        },
      ];
      setAllComments(updatedComments);
    }
  };

    
  return (
    <View>
      <ChatCardDate/>
      <View style={styles.cardContainer}>
        <View style={styles.menuList}>
        <ChatCardHeader post={samplePost}/>
        <ChatCardEditMenu onDeletetPress={handleDelete} onEditPress={handleEdit} />
        </View>
        <ChatCardImage imageUrl={sampleImageUrl}/> 
        <ChatCardDescription post={samplePost}/> 
        <CommentsSection comments={Comments} users={Users} onAddComment={handleAddComment}/>    
      </View> 
    </View>
  );
};

const styles = StyleSheet.create({
    cardContainer:{
     ... shadows.cardShadow,
      maxHeight: 'auto',
      maxWidth:'80%',
      backgroundColor: colors.background,
      borderRadius:5,
      position: 'relative'
    },
    menuList:{
      flexDirection: "row",
      justifyContent: "space-between",
      marginRight: 10,    
    }
});
