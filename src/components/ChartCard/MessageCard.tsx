import React from "react";
import { StyleSheet, View, Text,TouchableOpacity } from "react-native";
import { shadows } from "../../styles/shadows";
import colors from "../../assets/theme/colors";
import {PostEmoji, User, UserPost} from "../../utility/types";
import { ChatCardEditMenu } from "./ChatCardEditMenu";
import { ChatCardDate } from "./ChatCardDate";
import typography from "../../assets/theme/typography";
import { ChatCardEmoji } from "./ChatCardEmoji";
import { useNavigation } from "@react-navigation/native";
import { UserStack } from "../../utility/routeEnums";

type Props = {
  message: UserPost
  onDelete: () => void;
  loggedInUser: User
  addEmoji: (emoji: PostEmoji, postID : UserPost['id'])=>void
  deleteEmoji:(emoji: PostEmoji, postID : UserPost['id'])=>void
  commentsCount: number;
};

export const MessageCard = ({
  message,
  onDelete,
  loggedInUser,
  addEmoji,
  deleteEmoji,
  commentsCount
}: Props) => {


  const navigation = useNavigation<{
    navigate: (nav: UserStack,Props:{postID:UserPost['id'], loggedInUser: User}) => void;
  }>()

  const handlePress = () => {
    message && loggedInUser && navigation.navigate(UserStack.ChatCardScreen,{postID: message.id ,loggedInUser})  
   };
  const isCurrentUser = message.userID === loggedInUser.id
  return (
    <View
      style={[
        styles.container,
        isCurrentUser && { alignItems: "flex-end" },
      ]}
    >
      <ChatCardDate date={message.date} />
      <TouchableOpacity  onPress={handlePress} style={[styles.cardContainer]}>
        <View style={styles.contentContainer}>
          <View style={styles.nameAndMessageContainer}>
            <Text style={styles.userName}>
              {`${message.userFirstName} ${message.userLastName}`}
            </Text>
            <Text style={styles.messageText}>{message.description}</Text>
          </View>
          {isCurrentUser && <ChatCardEditMenu onDeletePress={onDelete} />}
        </View>
        <View style={styles.commentsAndEmojiContainer}>
        <ChatCardEmoji
            loggedInUser={loggedInUser}
            deleteEmoji={(emoji: PostEmoji) => deleteEmoji(emoji, message.id)}
            addEmoji={(emoji: PostEmoji) => addEmoji(emoji, message.id)}
            emoji={message.emoji}
            showAllEmojis={false}
          />
           {commentsCount > 0 ? (
            <Text style={styles.comments}>{commentsCount} Kommentarer</Text>
          ) : (
            <Text style={styles.comments}>0 Kommentarer</Text>
          )}
          </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10,
      },
    
      cardContainer: {
        ...shadows.cardShadow,
        width: "80%",
        backgroundColor: colors.background,
        borderRadius: 5,
      },
    
      contentContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 8,
      },
      nameAndMessageContainer: {
        // flex: 1,
      },
    
      userName: {
        ...typography.b2,
        fontWeight: "bold",
      },
    
      messageText: {
       ...typography.b2
      },
      commentsAndEmojiContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 8, 
      },
      comments:{
        ...typography.b2,
        textDecorationLine: 'underline'
      }
});
