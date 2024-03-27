import { user } from "firebase-functions/v1/auth";
import React from "react";
import {View,StyleSheet,Text
} from "react-native";
import { Comment, User} from "../../../utility/types";



  type props={
   comment:Comment
   user:User
  }

export const CommentView= ({comment,user}:props) => {
  
  return (
   <View style={styles.Container}>
    {/* <Text>{username}</Text>
    <Text>{comment.comment}</Text> */}
  
   </View>
  );
};

const styles = StyleSheet.create({

        Container:{
      },
     
 
});