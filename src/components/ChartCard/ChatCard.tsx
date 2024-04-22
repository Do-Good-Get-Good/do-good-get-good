import React, { useState } from "react";

import {StyleSheet,View,Text, Alert, TouchableOpacity
} from "react-native";
import { ChatCardHeader } from "./ChatCardHeader";
import { shadows } from "../../styles/shadows";
import colors from "../../assets/theme/colors";

import { ActivityListOverLay } from "./ActivityListOverLay";
import { ChatCardImage } from "./ChatCardImage";
import { ChatCardDescription } from "./ChatCardDescription";
import { CommentsSection } from "./ChatComments/CommentsSection";
import { Comment, User, UserPost } from "../../utility/types";
import { ChatCardEditMenu } from "./ChatCardEditMenu";
import { ChatCardDate } from "./ChatCardDate";

type Props  = {
post: UserPost
users: User[]
handleAddComment: ()=> void
}

export const ChatCard = ({post, users, handleAddComment}:Props) => {

  const handleDelete=()=>{
    Alert.alert("Delete button pressed")  
  }

  return (
    <View testID="chat-card"  >
    <View style={styles.container}>
      <ChatCardDate date={post.date}/>
      <TouchableOpacity style={styles.cardContainer}>

        <View style={styles.headerAndMenu}>
        <ChatCardHeader post={post}/>
        <ChatCardEditMenu  onDeletetPress={handleDelete}  />
        </View>
      <ChatCardImage imageUrl={post.imageURL}/> 
        <ChatCardDescription description={post.description}/>
        <CommentsSection comments={post.comments } users={users} onAddComment={handleAddComment}/>  
      </TouchableOpacity> 
    </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container:{
    marginVertical:10
  },
    cardContainer:{
     ... shadows.cardShadow,
      maxWidth:'80%',
      backgroundColor: colors.background,
      borderRadius:5,

    },
    headerAndMenu:{
      flex:0.3,
      flexDirection: "row",
      justifyContent: "space-between",
      padding:4,
      marginRight:10,
    }
})
