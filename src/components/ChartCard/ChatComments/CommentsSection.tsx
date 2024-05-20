import React, {useState } from "react";
import {
  View,StyleSheet
} from "react-native";
import { Comment, User, UserPost } from "../../../utility/types";
import { CommentInfo } from "./CommentInfo";
import { InputField } from "../../InputField";
import { ChatCardEditMenu } from "../ChatCardEditMenu";


const makeCommentObject = (user: User, comment:Comment['comment']) => ({
  comment: comment,
  userID: user.id,
  userFirstName: user.firstName,
  userLastName: user.lastName,
});

type Props ={
    comments:UserPost['comments'],
    loggedInUser: User
    addComment: (comment: Comment)=>void
    deleteComment: (comment: Comment)=>void
  }

export const CommentsSection = ({comments = [],addComment,loggedInUser}: Props) => {
  const handleCommentSubmit = async (comment: Comment['comment']) => {
    const newComment = makeCommentObject(loggedInUser, comment);
    addComment(newComment);
  };

  const onDeletePress = () => {
    console.log('comment delete button pressed');
  };

  return (
  <View>
      {comments.map((comment, index) => (
        <View key={index} style={styles.commentContainer}>
          <CommentInfo comment={comment} />
          {comment.userID === loggedInUser.id && (
            <ChatCardEditMenu onDeletePress={onDeletePress} />
          )}
        </View>
      ))}
      <InputField
        onSubmit={handleCommentSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
