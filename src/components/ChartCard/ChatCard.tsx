import React, { useState } from "react";
import { StyleSheet, View, Text, Alert, TouchableOpacity } from "react-native";
import { ChatCardHeader } from "./ChatCardHeader";
import { shadows } from "../../styles/shadows";
import colors from "../../assets/theme/colors";
import { ChatCardImage } from "./ChatCardImage";
import { ChatCardDescription } from "./ChatCardDescription";
import { CommentsSection } from "./ChatComments/CommentsSection";
import { Comment, PostEmoji, User, UserPost } from "../../utility/types";
import { ChatCardEditMenu } from "./ChatCardEditMenu";
import { ChatCardDate } from "./ChatCardDate";
import { ChatCardEmoji } from "./ChatCardEmoji";

type Props = {
  post: UserPost;
  users: User[];
  handleAddComment: () => void;
  onDelete: () => void;
  addEmoji: (emoji: PostEmoji, postID : UserPost['id'])=>void
  deleteEmoji:(emoji: PostEmoji, postID : UserPost['id'])=>void
  loggedInUser: User
};

export const ChatCard = ({
  post,
  users,
  handleAddComment,
  onDelete,
  addEmoji,
  deleteEmoji,
  loggedInUser
}: Props) => {
  const isCurrentUser = post.userID === loggedInUser.id
  return (
    <View
      testID="chat-card"
      style={[styles.container, isCurrentUser && { alignItems: "flex-end" }]}
    >
      <ChatCardDate date={post.date} />
      <TouchableOpacity style={[styles.cardContainer]}>
        <View style={styles.headerAndMenu}>
          <ChatCardHeader post={post} />
          {isCurrentUser && <ChatCardEditMenu onDeletePress={onDelete} />}
        </View>
        <ChatCardImage imageUrl={post.imageURL ?? ''} />
        <ChatCardDescription description={post.description} />
        <View style={styles.commentsAndEmojiContainer}>
        <ChatCardEmoji loggedInUser={loggedInUser}
          deleteEmoji={ (emoji: PostEmoji)=>deleteEmoji( emoji, post.id)}
         addEmoji={(emoji: PostEmoji)=>addEmoji( emoji, post.id)} 
         
        emoji={post.emoji}/>
        <CommentsSection
          comments={[]}
          users={users}
          onAddComment={handleAddComment}
        />
         </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },

  cardContainer: {
    ...shadows.cardShadow,
    width: "80%",
    backgroundColor: colors.background,
    borderRadius: 5,
  },

  headerAndMenu: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 4,
    marginRight: 10,
  },
  commentsAndEmojiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10, 
  },
  
});
