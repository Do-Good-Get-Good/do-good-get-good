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
    <View >
        <Text style={styles.textDescription}>{user.firstName} {user.lastName}:{' '} {comment.comment} </Text>    
    </View>
  );
};

const styles = StyleSheet.create({
    textDescription:{
        flexDirection:'row',
        marginLeft:10 ,
        ...typography.b2,
        color: colors.dark       
    },
});