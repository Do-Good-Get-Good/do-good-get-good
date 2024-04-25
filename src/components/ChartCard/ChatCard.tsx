import React, { useState } from "react";
import { StyleSheet, View, Text, Alert, TouchableOpacity } from "react-native";
import { ChatCardHeader } from "./ChatCardHeader";
import { shadows } from "../../styles/shadows";
import colors from "../../assets/theme/colors";
import { ChatCardImage } from "./ChatCardImage";
import { ChatCardDescription } from "./ChatCardDescription";
import { CommentsSection } from "./ChatComments/CommentsSection";
import { Comment, User, UserPost } from "../../utility/types";
import { ChatCardEditMenu } from "./ChatCardEditMenu";
import { ChatCardDate } from "./ChatCardDate";

type Props = {
  post: UserPost;
  users: User[];
  handleAddComment: () => void;
  currentUserId:string
};

export const ChatCard = ({ post, users, handleAddComment,currentUserId }: Props) => {

   const isCurrentUser = post.userID === currentUserId;

   const containerStyle = isCurrentUser && styles.currentUserContainer;
   const cardContainerStyle = isCurrentUser && styles.currentUserCardContainer;

   const handleDelete = () => {
    Alert.alert("Delete button pressed");
  };

  return (
    <View testID="chat-card" style={[styles.container, containerStyle]}>
      <ChatCardDate date={post.date}/>
      <TouchableOpacity style={[styles.cardContainer, cardContainerStyle]}>
        <View style={styles.headerAndMenu}>
          <ChatCardHeader post={post} />
          {/* <ChatCardEditMenu onDeletetPress={handleDelete}/> */}
          {isCurrentUser && <ChatCardEditMenu onDeletePress={handleDelete} />}
        </View>
        <ChatCardImage imageUrl={post.imageURL} />
        <ChatCardDescription description={post.description} />
        <CommentsSection
          comments={post.comments}
          users={users}
          onAddComment={handleAddComment}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    marginVertical: 10,
  },
  currentUserContainer: {
    alignItems: 'flex-end',
  },
  cardContainer: {
    ...shadows.cardShadow,
    maxWidth: "80%",
    backgroundColor: colors.background,
    borderRadius: 5,
  },
  currentUserCardContainer: {
    ...shadows.cardShadow,
    backgroundColor: colors.primary,
    width:'80%'
  },
  headerAndMenu: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 4,
    marginRight: 10,
  }
});
