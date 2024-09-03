import React, { memo } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { shadows } from "../../styles/shadows";
import colors from "../../assets/theme/colors";
import { PostEmoji, User, UserPost } from "../../utility/types";
import { ChatCardEditMenu } from "./ChatCardEditMenu";
import { ChatCardDate } from "./ChatCardDate";
import typography from "../../assets/theme/typography";
import { ChatCardEmoji } from "./ChatCardEmoji";
import { useNavigation } from "@react-navigation/native";
import { UserStack } from "../../utility/routeEnums";
import { Role } from "../../utility/enums";
import { ChatCardDescription } from "./ChatCardDescription";
import { useUserLevel } from "../../context/useUserLevel";

type Props = {
  message: UserPost;
  onDelete: () => void;
  loggedInUser: User;
  addEmoji: (emoji: PostEmoji, postID: UserPost["id"]) => void;
  deleteEmoji: (emoji: PostEmoji, postID: UserPost["id"]) => void;
  commentsCount: number;
};

const MessageCard = memo(
  ({
    message,
    onDelete,
    loggedInUser,
    addEmoji,
    deleteEmoji,
    commentsCount,
  }: Props) => {
    const { userLevel } = useUserLevel();
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

    const handlePress = () => {
      message &&
        loggedInUser &&
        navigation.navigate(UserStack.ChatCardScreen, {
          postID: message.id,
          loggedInUser,
        });
    };

    const editPress = () => {
      message &&
        navigationEdit.navigate(UserStack.AddOrEditPost, {
          post: message,
          toEdit: true,
        });
    };

    const isCurrentUser = message.userID === loggedInUser.id;
    const isMenuShow = isCurrentUser || userLevel === Role.superadmin;

    return (
      <View testID="chat-message" style={styles.container}>
        <ChatCardDate date={message.date} />
        <TouchableOpacity onPress={handlePress} style={[styles.cardContainer]}>
          <View style={styles.nameTextChangedMenuContainer}>
            <Text style={styles.userName}>
              {`${message.userFirstName} ${message.userLastName}`}
            </Text>
            {isMenuShow && (
              <ChatCardEditMenu
                onDeletePress={onDelete}
                onEditPress={editPress}
                isCurrentUser={isCurrentUser}
                isMessageChanged={message.changed ?? false}
              />
            )}
          </View>
          <ChatCardDescription description={message.description} />
          <View style={styles.commentsAndEmojiContainer}>
            <ChatCardEmoji
              loggedInUser={loggedInUser}
              deleteEmoji={(emoji: PostEmoji) => deleteEmoji(emoji, message.id)}
              addEmoji={(emoji: PostEmoji) => addEmoji(emoji, message.id)}
              emoji={message.emoji}
              showAllEmojis={false}
            />
            <Text style={styles.comments}>{commentsCount} Kommentarer</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  },
);

export default MessageCard;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: "center",
    flex: 1,
  },
  cardContainer: {
    ...shadows.cardShadow,
    width: "90%",
    backgroundColor: colors.background,
    borderRadius: 5,
  },
  nameTextChangedMenuContainer: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    position: "relative",
    zIndex: 1,
  },
  userName: {
    ...typography.b2,
    fontWeight: "bold",
    paddingVertical: 8,
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
    zIndex: 1,
  },
});
