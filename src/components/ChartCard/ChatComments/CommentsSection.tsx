import React, {useState } from "react";
import {
  View,StyleSheet
} from "react-native";
import { Comment, User, UserPost } from "../../../utility/types";
import { CommentInfo } from "./CommentInfo";
import { InputField } from "../../InputField";
import { ChatCardEditMenu } from "../ChatCardEditMenu";
import { deleteComment } from "../../../firebase-functions/deleteTS/delete";
import userLevelStore from "../../../store/userLevel";
import { Role } from "../../../utility/enums";


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
    postID: UserPost['id']
  }

export const CommentsSection = ({comments = [],addComment,loggedInUser,postID}: Props) => {

  const { userLevel } = userLevelStore;
  const handleCommentSubmit = async (comment: Comment['comment']) => {
    const newComment = makeCommentObject(loggedInUser, comment);
    addComment(newComment);
  };

  const onDeletePress = (comment: Comment) => {
    deleteComment( comment,postID);
  };
  
  return (
  <View>
      {comments.map((comment, index) => (
        <View key={index} style={styles.commentContainer}>
          <CommentInfo comment={comment} />
          {(comment.userID === loggedInUser.id || userLevel === Role.superadmin)  && (
            <ChatCardEditMenu onDeletePress={() => onDeletePress(comment)} />
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
    justifyContent: 'space-between',
    marginHorizontal:10
  }
});
