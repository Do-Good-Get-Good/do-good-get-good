import React, { useCallback,useState } from "react";
import {
  View,StyleSheet,Text, TextInput, Button, Alert, TouchableOpacity
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
  const [showComments, setShowComments] = useState(false);

  const findUserNameAndComment = useCallback(() => {
    return (comments || []).map(comment => {
        const user = users.find(user => user.id === comment.userID);
        return user && { user, comment };
    });
}, [comments, users]);
  return (

  //      <View>
  //   { findUserNameAndComment().map((item)=>item &&<CommentInfo  key={item.comment.id} comment={item.comment} user={item.user}/>)}
  //   <TouchableOpacity>
  //   <Text style={{fontSize:20,marginVertical:40,textDecorationLine: 'underline'}}>{`${comments.length}`} kommentarer</Text>
  //   </TouchableOpacity>
  //   <LongButton style={styles.longButton} title="Skriv en kommentar" onPress={()=>(Alert.alert("Skriv en kommentar pressed"))}/>
  //  </View>


    <View>
    {!showComments && (
        <TouchableOpacity onPress={()=>{}}>
            <Text style={styles.commentsText}>{`${comments.length}`} kommentarer</Text>
        </TouchableOpacity>
    )}
    {showComments && findUserNameAndComment().map((item) => item && <CommentInfo key={item.comment.id} comment={item.comment} user={item.user} />)}
    {/* //TO Do fix textinput with a button for adding a new comment  */}
    {/* <LongButton style={styles.longButton} title="Skriv en kommentar" onPress={() => (Alert.alert("Skriv en kommentar pressed"))} /> */}
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
