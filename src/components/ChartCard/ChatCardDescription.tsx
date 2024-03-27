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
   <View style={styles.detailsContainer}>
    <Text style={styles.textDescription}>{post.description}</Text>
   </View>
  );
};

const styles = StyleSheet.create({

    detailsContainer:{
        flexDirection:'row',
        alignItems: 'center',
        marginLeft:10,
      },
      textDescription:{
        ...typography.b1,
        marginLeft: 5,
        color: colors.dark
      }
 
});

