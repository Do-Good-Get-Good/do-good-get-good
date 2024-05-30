import React from "react";
import { StyleSheet, View,TouchableOpacity, Text } from "react-native";
import { ChatCardHeader } from "./ChatCardHeader";
import { shadows } from "../../styles/shadows";
import colors from "../../assets/theme/colors";
import { ChatCardImage } from "./ChatCardImage";
import { ChatCardDescription } from "./ChatCardDescription";
import { PostEmoji, User, UserPost } from "../../utility/types";
import { ChatCardEditMenu } from "./ChatCardEditMenu";
import { ChatCardDate } from "./ChatCardDate";
import { ChatCardEmoji } from "./ChatCardEmoji";
import { useNavigation } from "@react-navigation/native";
import { UserStack } from "../../utility/routeEnums";
import typography from "../../assets/theme/typography";
import userLevelStore from "../../store/userLevel";
import { Role } from "../../utility/enums";

type Props = {
  post: UserPost;
  onDelete: () => void;
  addEmoji: (emoji: PostEmoji, postID : UserPost['id'])=>void
  deleteEmoji:(emoji: PostEmoji, postID : UserPost['id'])=>void
  loggedInUser: User
  commentsCount: number;
};

export const ChatCard = ({
  post,
  onDelete,
  addEmoji,
  deleteEmoji,
  loggedInUser,
  commentsCount
}: Props) => {
  const { userLevel } = userLevelStore;
  const isCurrentUser = post.userID === loggedInUser.id;
  const navigation = useNavigation<{
    navigate: (nav: UserStack,Props:{postID:UserPost['id'], loggedInUser: User}) => void;
  }>();

  const isMenuShow = isCurrentUser || userLevel === Role.superadmin

  const handlePress = () => {
   post && loggedInUser && navigation.navigate(UserStack.ChatCardScreen,{postID: post.id ,loggedInUser})  
  };

  return (
    <View
      testID="chat-card"
      style={[styles.container, isCurrentUser && { alignItems: 'center' }]}
    >
      <ChatCardDate date={post.date} />
      <TouchableOpacity  onPress={handlePress}style={[styles.cardContainer]}>
        <View style={styles.headerAndMenu}>
          <ChatCardHeader post={post} />
          { isMenuShow && <ChatCardEditMenu  onDeletePress={onDelete} />}
        </View>
        <ChatCardImage imageUrl={post.imageURL ?? ''} />
        <ChatCardDescription description={post.description} />
        <View style={styles.commentsAndEmojiContainer}>
        <ChatCardEmoji
            loggedInUser={loggedInUser}
            deleteEmoji={(emoji: PostEmoji) => deleteEmoji(emoji, post.id)}
            addEmoji={(emoji: PostEmoji) => addEmoji(emoji, post.id)}
            emoji={post.emoji}
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
  },
  headerAndMenu: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 4,
    marginRight: 10,
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
