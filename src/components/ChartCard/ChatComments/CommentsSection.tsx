import React from "react";
import { StyleSheet, View } from "react-native";
import { useUserLevel } from "../../../context/useUserLevel";
import { deleteComment } from "../../../firebase-functions/deleteTS/delete";
import { Role } from "../../../utility/enums";
import { Comment, User, UserPost } from "../../../utility/types";
import { InputField } from "../../InputField";
import { ChatCardEditMenu } from "../ChatCardEditMenu";
import { CommentInfo } from "./CommentInfo";

const makeCommentObject = (user: User, comment: Comment["comment"]) => ({
  comment: comment,
  userID: user.id,
  userFirstName: user.firstName,
  userLastName: user.lastName,
});

type Props = {
  comments: UserPost["comments"];
  loggedInUser: User;
  addComment: (comment: Comment) => void;
  deleteComment: (comment: Comment) => void;
  postID: UserPost["id"];
};

export const CommentsSection = ({
  comments = [],
  addComment,
  loggedInUser,
  postID,
}: Props) => {
  const { userLevel } = useUserLevel();
  const handleCommentSubmit = async (comment: Comment["comment"]) => {
    const newComment = makeCommentObject(loggedInUser, comment);
    addComment(newComment);
  };

  const onDeletePress = (comment: Comment) => {
    deleteComment(comment, postID);
  };

  return (
    <View style={styles.commentsSection}>
      {comments.map((comment, index) => (
        <View key={index} style={styles.commentContainer}>
          <CommentInfo comment={comment} />
          {(comment.userID === loggedInUser.id ||
            userLevel === Role.superadmin) && (
            <View style={styles.menuContainer}>
              <ChatCardEditMenu
                textWhatItemToDelete={"kommentar"}
                onDeletePress={() => onDeletePress(comment)}
              />
            </View>
          )}
        </View>
      ))}
      <InputField onSubmit={handleCommentSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  commentsSection: {
    marginHorizontal: 10,
  },
  commentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    position: "relative",
    zIndex: 1,
  },
  menuContainer: {
    zIndex: 2,
  },
});
