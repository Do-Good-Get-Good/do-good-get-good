import React, { useState } from "react";
import {
  View,StyleSheet,Text,Image, Dimensions, TouchableOpacity
} from "react-native";
import { PostEmoji, User } from "../../utility/types";

type Props={
    emojis:PostEmoji[],
    users: User[];
}

export const EmojiList = ({emojis,users}:Props) => {

  return (

    <View style={styles.container}>
    {emojis.map((emoji, index) => {
        const user = users.find(user => user.id === emoji.userID);
        return (
            <View key={index} style={styles.emojiContainer}>
                <Text style={styles.emoji}>
                    {emoji.emojiName}
                </Text>
                {user && (
                    <Text style={styles.username}>
                        {`${user.firstName} ${user.lastName}`}
                    </Text>
                )}
            </View>
           );
        })}
   </View>  
  );
};

const styles = StyleSheet.create({


    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    emojiContainer: {
        flexDirection: 'row',
    },
    emoji: {
        fontSize: 28,
        marginRight: 5
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
    }
});
