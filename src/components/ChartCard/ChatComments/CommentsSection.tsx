import React, { useState } from "react";
import {
  View,StyleSheet,Text, TextInput, Button
} from "react-native";
import { Comment, User } from "../../../utility/types";
import colors from "../../../assets/theme/colors";
import { CommentInfo } from "./CommentInfo";
import { InputField } from "../../InputField";
import typography from "../../../assets/theme/typography";

type Props ={
    comments:Comment[],
    users:User[],
  }
  
export const CommentsSection = ({comments,users}: Props) => {
  const [newComment,setNewComment]=useState('')
  const [enteredComment, setEnteredComment] = useState('');
  const handleAddComment=()=>{
    console.log("Button pressed")
    setEnteredComment(newComment);
    setNewComment('');
  }
  
  return (
   <View>
    {comments.map((comment)=>{
        const user=users.find((user)=>user.id ===comment.userID);
        if (!user) return null;
        return <CommentInfo key={comment.id} comment={comment} user={user}/>
    })}
     {enteredComment ? <Text style={styles. newCommentView}>{enteredComment}</Text> : null}
    <View style={styles.commentDetails}>
      <View >
      <InputField
       placeholder="Skriv en kommentar"
       value={newComment}
       onChangeText={setNewComment}
       onSubmit={handleAddComment}
      />
      </View>
    </View>
   </View>
  );
};

const styles = StyleSheet.create({
  commentDetails:{
    flexDirection:'row',
    justifyContent:'center',
    borderWidth:1,
    padding:2,
    margin:10,
    borderColor:colors.secondary,
    color:colors.dark,
  },
  newCommentView: {
    alignItems: 'center',
    ...typography.b2,
    marginLeft: 5,
    color: colors.dark,
},
});
