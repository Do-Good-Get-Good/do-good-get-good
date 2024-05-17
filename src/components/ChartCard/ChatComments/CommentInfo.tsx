import React from "react";
import {View,StyleSheet,Text
} from "react-native";
import { Comment, User} from "../../../utility/types";
import typography from "../../../assets/theme/typography";
import colors from "../../../assets/theme/colors";

  type props={
   comment:Comment
  }
export const CommentInfo= ({comment}:props) => {
  return (
    <View style={styles.container}>
        <Text testID="comment-user-name" style={styles.textDescription}>{`${comment.userFirstName} ${comment.userLastName}`}</Text> 
        <Text testID="comment-text" numberOfLines={1} style={styles.textComment}>{`${comment.comment}`}</Text>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container:{
  //  marginVertical:4
  },
    textDescription:{
       marginHorizontal:10,
        ...typography.b2,
        color: colors.dark,
        fontWeight:'bold'     
    },
    textComment:{
      padding:12,
      ...typography.b2,
        color: colors.dark ,
    },
});