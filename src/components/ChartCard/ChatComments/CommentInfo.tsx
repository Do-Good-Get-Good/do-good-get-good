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
        <Text testID="comment-user-name" style={styles.textDescription}>{`${user.firstName} ${user.lastName}`}</Text> 
        <Text testID="comment-text" numberOfLines={1} style={styles.textComment}>{`${comment.comment}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    // flexDirection:'row'
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
      padding:12,
      ...typography.b2,
        color: colors.dark ,
        flex:1 
    },
});