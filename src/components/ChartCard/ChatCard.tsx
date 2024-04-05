import React, { useState } from "react";
import {StyleSheet,View,Text, Alert
} from "react-native";
import { ChatCardHeader } from "./ChatCardHeader";
import { shadows } from "../../styles/shadows";
import colors from "../../assets/theme/colors";
import { ChatCardImage } from "./ChatCardImage";
import { ChatCardDescription } from "./ChatCardDescription";
import { CommentsSection } from "./ChatComments/CommentsSection";
import { Comment, User, UserPost } from "../../utility/types";
import { ChatCardEditMenu } from "./ChatCardEditMenu";
import { ChatCardDate } from "./ChatCardDate";

type Props  = {
post: UserPost
users: User[]
}

export const ChatCard = ({post, users}:Props) => {
  const [allComments, setAllComments] = useState<Comment[]>([]);
 
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
      <ChatCardDate date={post.date}/>
      <View style={styles.cardContainer}>
        <View style={styles.menuList}>
        <ChatCardHeader post={post}/>
        <ChatCardEditMenu onDeletetPress={handleDelete}  />
        </View>
        <ChatCardImage imageUrl={post.imageURL}/> 
        <ChatCardDescription description={post.description}/>
        <CommentsSection comments={post.comments } users={users} onAddComment={handleAddComment}/>  
      </View> 
    </View>
  );
};

const styles = StyleSheet.create({
    cardContainer:{
     ... shadows.cardShadow,
      maxWidth:'80%',
      backgroundColor: colors.background,
      borderRadius:5,
    },
    menuList:{
      flexDirection: "row",
      justifyContent: "space-between",
      marginRight:2,    
    }
});
