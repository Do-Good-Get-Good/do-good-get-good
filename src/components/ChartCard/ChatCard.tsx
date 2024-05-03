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
import { ChatCardEmoji } from "./ChatCardEmoji";

type Props = {
  post: UserPost;
  users: User[];
  handleAddComment: () => void;
  onDelete: () => void;
  isCurrentUser: boolean;
};

export const ChatCard = ({
  post,
  users,
  handleAddComment,
  onDelete,
  isCurrentUser,
}: Props) => {
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
        <ChatCardImage imageUrl={post.imageURL} />
        <ChatCardDescription description={post.description} />
        {/* <ChatCardEmoji/> */}
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
});
