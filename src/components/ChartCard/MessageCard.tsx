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
import userLevelStore from "../../store/userLevel";
import { Role } from "../../utility/enums";


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

  const { userLevel } = userLevelStore;
  const navigation = useNavigation<{
    navigate: (nav: UserStack,Props:{postID:UserPost['id'], loggedInUser: User}) => void;
  }>()

  const navigationEdit = useNavigation<{
    navigate: (nav: UserStack,Props:{post:UserPost,toEdit:boolean}) => void;
  
  }>();

  const handlePress = () => {
    message && loggedInUser && navigation.navigate(UserStack.ChatCardScreen,{postID: message.id ,loggedInUser})  
   };

   const editPress = () => {
    message && navigationEdit.navigate(UserStack.AddOrEditPost,{post: message,toEdit:true})  
   };

  const isCurrentUser = message.userID === loggedInUser.id;
  const isMenuShow = isCurrentUser || userLevel === Role.superadmin
 
  return (
    <View
      style={[
        styles.container,
        isCurrentUser && { alignItems: 'center' },
      ]}
    >
      <ChatCardDate date={message.date} />
      <TouchableOpacity  onPress={handlePress} style={[styles.cardContainer]}>
        <View style={styles.contentContainer}>
          <View style={styles.nameAndEditContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.userName}>
              {`${message.userFirstName} ${message.userLastName}`}
            </Text>
          </View>
          {message.changed && <Text style={styles.changedText}>ändrats</Text>}
          {isMenuShow && <ChatCardEditMenu onDeletePress={onDelete} onEditPress={editPress} showEditOption={true} isCurrentUser={isCurrentUser} />}
          </View>
            <Text style={styles.messageText}>{message.description}</Text>
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
        alignItems:'center'
      },
      cardContainer: {
        ...shadows.cardShadow,
        width: "90%",
        backgroundColor: colors.background,
        borderRadius: 5,
        position: 'relative',
      },
      contentContainer: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        zIndex: 1,
      },
      nameAndEditContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      nameContainer: {
        flex: 1,
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
      },
      changedText:{
        ...typography.b2,
        marginHorizontal:10,
        marginTop:10
     }
});
