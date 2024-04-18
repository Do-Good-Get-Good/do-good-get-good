import React, { useCallback,useState } from "react";
import {
  View,StyleSheet,Text, TextInput, Button, Alert
} from "react-native";
import { Comment, User } from "../../../utility/types";
import colors from "../../../assets/theme/colors";
import { CommentInfo } from "./CommentInfo";
import { InputField } from "../../InputField";
import typography from "../../../assets/theme/typography";
import { LongButton } from "../../Buttons/LongButton";

type Props ={
    comments:Comment[],
    users:User[],
    onAddComment:(newComment:string)=>void
  }
export const CommentsSection = ({comments,users,onAddComment}: Props) => {

  const findUserNameAndComment = useCallback(() => {
    return (comments || []).map(comment => {
        const user = users.find(user => user.id === comment.userID);
        return user && { user, comment };
    });
}, [comments, users]);
  return (
   <View>
    { findUserNameAndComment().map((item)=>item &&<CommentInfo  key={item.comment.id} comment={item.comment} user={item.user}/>)}
    <LongButton style={styles.longButton} title="Skriv en kommentar" onPress={()=>(Alert.alert("Skriv en kommentar pressed"))}/>
   </View>
  );
};

const styles = StyleSheet.create({
  longButton:{
    marginTop:20,
      borderRadius:5,
      marginRight:20,
      height:30,
      marginLeft:20,
      marginBottom:20,
      ...typography.button
   }
});