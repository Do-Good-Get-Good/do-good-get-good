import React, {useState } from "react";
import {
  View,StyleSheet
} from "react-native";
import { Comment, User, UserPost } from "../../../utility/types";
import { CommentInfo } from "./CommentInfo";
import { InputField } from "../../InputField";
import typography from "../../../assets/theme/typography";
import { ChatCardEditMenu } from "../ChatCardEditMenu";


type Props ={
    comments:UserPost['comments'],
    loggedInUser: User
    addComment: (comment: Comment)=>void
    deleteComment:(comment: Comment)=>void
  }
export const CommentsSection = ({comments,addComment,deleteComment,loggedInUser}: Props) => {
  const [textInputValue, setTextInputValue] = useState('');

  const onSubmitPress = () => {
    console.log('Submitted value:', textInputValue);
    setTextInputValue('')
  };
  const onDeletePress = () => {
    console.log('comment delete button pressed');
  };


  return (
  <View>
      {comments.map((comment) => (
        <View key={comment.id} style={styles.commentContainer}>
          <CommentInfo comment={comment} />
          {comment.userID === loggedInUser.id && (
            <ChatCardEditMenu onDeletePress={onDeletePress} />
          )}
        </View>
      ))}
      <InputField
        placeholder="Skriv en kommentar"
        value={textInputValue}
        onChangeText={(text: string)=>setTextInputValue(text)}
        onSubmit={onSubmitPress}
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
