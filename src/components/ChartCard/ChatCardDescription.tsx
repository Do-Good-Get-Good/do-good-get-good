import React from "react";
import {StyleSheet,Text
} from "react-native";
import { UserPost } from "../../utility/types";
import typography from "../../assets/theme/typography";
import colors from "../../assets/theme/colors";


type Props ={
  description: UserPost['description'];
}

export const ChatCardDescription = ({description }: Props) => {
  
  return (
    <Text style={styles.textDescription}>{description}</Text>
  );
};

const styles = StyleSheet.create({

      textDescription:{
        ...typography.b2,
        marginLeft: 10,
        color: colors.dark
      }
 
});

