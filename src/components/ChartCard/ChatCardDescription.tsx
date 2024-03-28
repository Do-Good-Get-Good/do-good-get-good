import React from "react";
import {View,StyleSheet,Text
} from "react-native";
import { UserPost } from "../../utility/types";
import typography from "../../assets/theme/typography";
import colors from "../../assets/theme/colors";


type Props ={
    post: UserPost;
  }

export const ChatCardDescription = ({post }: Props) => {
  
  return (
    <Text style={styles.textDescription}>{post.description}</Text>
  );
};

const styles = StyleSheet.create({

      textDescription:{
        ...typography.b2,
        marginLeft: 10,
        color: colors.dark
      }
 
});

