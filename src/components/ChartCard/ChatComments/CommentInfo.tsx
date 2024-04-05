import React from "react";
import {View,StyleSheet,Text
} from "react-native";
import { Comment, User} from "../../../utility/types";
import typography from "../../../assets/theme/typography";
import colors from "../../../assets/theme/colors";

  type props={
   comment:Comment
   user:User
  }
export const CommentInfo= ({comment,user}:props) => {
  return (
    <View style={styles.container}>
        <Text style={styles.textDescription}>{user.firstName} {user.lastName} {' ' }</Text> 
        <View style={styles.commentContainer}>   
        <Text style={styles.textComment}>{comment.comment}</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flexDirection:'row'
  },
    textDescription:{
        flexDirection:'row',
        marginLeft:10 ,
        ...typography.b2,
        color: colors.dark,
        fontWeight:'bold'     
    },
    textComment:{
      flexDirection:'row',
        ...typography.b2,
        color: colors.dark  
    },
    commentContainer: {
      flex: 1,
      maxWidth: "auto", 
    },
});