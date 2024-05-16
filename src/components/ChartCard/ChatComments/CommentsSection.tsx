import React, {useState } from "react";
import {
  View,StyleSheet
} from "react-native";
import { UserPost } from "../../../utility/types";
import { CommentInfo } from "./CommentInfo";
import { InputField } from "../../InputField";
import typography from "../../../assets/theme/typography";


type Props ={
    comments:UserPost['comments'],
    addComment:(newComment:string)=>void
  }
export const CommentsSection = ({comments,addComment}: Props) => {
  const [textInputValue, setTextInputValue] = useState('');

  const handleInputChange = (text: string) => {
    setTextInputValue(text);
  };

  const handleSubmit = () => {
    console.log('Submitted value:', textInputValue);
    setTextInputValue('')
  };
  return (

    <View>
    {comments.map((comment) => (
      <CommentInfo key={comment.id} comment={comment} />
    ))}
    <InputField
        placeholder="Skriv en kommentar"
        value={textInputValue}
        onChangeText={handleInputChange}
        onSubmit={handleSubmit}
    />
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
   },
   commentsText:{
     ...typography.b2,
      textDecorationLine: 'underline',
       marginHorizontal:10
   }
});
