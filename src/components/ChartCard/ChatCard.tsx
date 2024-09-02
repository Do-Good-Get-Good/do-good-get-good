import React, { memo } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
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
import { Role } from "../../utility/enums";
import { useUserLevel } from "../../context/useUserLevel";

type Props = {
  post: UserPost;
  onDelete: () => void;
  addEmoji: (emoji: PostEmoji, postID: UserPost["id"]) => void;
  deleteEmoji: (emoji: PostEmoji, postID: UserPost["id"]) => void;
  loggedInUser: User;
  commentsCount: number;
};

const ChatCard = memo(
  ({
    post,
    onDelete,
    addEmoji,
    deleteEmoji,
    loggedInUser,
    commentsCount,
  }: Props) => {
    const { userLevel } = useUserLevel();
    const isCurrentUser = post.userID === loggedInUser.id;
    const navigation = useNavigation<{
      navigate: (
        nav: UserStack,
        Props: { postID: UserPost["id"]; loggedInUser: User },
      ) => void;
    }>();

    const navigationEdit = useNavigation<{
      navigate: (
        nav: UserStack,
        Props: { post: UserPost; toEdit: boolean },
      ) => void;
    }>();

    const isMenuShow = isCurrentUser || userLevel === Role.superadmin;

    const handlePress = () => {
      post &&
        loggedInUser &&
        navigation.navigate(UserStack.ChatCardScreen, {
          postID: post.id,
          loggedInUser,
        });
    };

    const editPress = () => {
      post &&
        navigationEdit.navigate(UserStack.AddOrEditPost, {
          post: post,
          toEdit: true,
        });
    };

    return (
      <View testID="chat-card" style={styles.container}>
        <ChatCardDate date={post.date} />
        <TouchableOpacity onPress={handlePress} style={[styles.cardContainer]}>
          <View style={styles.headerAndMenu}>
            <ChatCardHeader post={post} />
            {isMenuShow && (
              <ChatCardEditMenu
                isMessageChanged={post.changed ?? false}
                onDeletePress={onDelete}
                onEditPress={editPress}
                isCurrentUser={isCurrentUser}
              />
            )}
          </View>
          <ChatCardImage imageUrl={post.imageURL ?? ""} />
          <ChatCardDescription description={post.description} />
          <View style={styles.commentsAndEmojiContainer}>
            <ChatCardEmoji
              loggedInUser={loggedInUser}
              deleteEmoji={(emoji: PostEmoji) => deleteEmoji(emoji, post.id)}
              addEmoji={(emoji: PostEmoji) => addEmoji(emoji, post.id)}
              emoji={post.emoji}
              showAllEmojis={false}
            />
            <Text style={styles.comments}>{commentsCount} Kommentarer</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  },
);

export default ChatCard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    alignItems: "center",
  },
  cardContainer: {
    ...shadows.cardShadow,
    width: "90%",
    backgroundColor: colors.background,
    borderRadius: 5,
    position: "relative",
  },
  headerAndMenu: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 4,
    marginRight: 10,
    zIndex: 1,
  },
  commentsAndEmojiContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  comments: {
    ...typography.b2,
    textDecorationLine: "underline",
  },
});
