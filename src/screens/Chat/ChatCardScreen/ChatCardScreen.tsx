import React, { useEffect, useState } from "react";
import {
  View,StyleSheet,Text, ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Menu from "../../../components/Menu";
import BottomLogo from "../../../components/BottomLogo";
import { GoBackButton } from "../../../components/Buttons/GoBackButton";
import { Comment, PostEmoji, User, UserPost } from "../../../utility/types";
import { ChatCardImage } from "../../../components/ChartCard/ChatCardImage";
import { ChatCardDescription } from "../../../components/ChartCard/ChatCardDescription";
import { ChatCardDate } from "../../../components/ChartCard/ChatCardDate";
import { ChatCardEmoji } from "../../../components/ChartCard/ChatCardEmoji";
import { CommentsSection } from "../../../components/ChartCard/ChatComments/CommentsSection";
import { useUserPostsActions } from "../useUserPostsActions";
import { onSnapshotSelectedPost } from "../../../firebase-functions/onSnapshotsFunctions";
import { ChatCardWithActivity } from "./ChatCardWithActivity";
import typography from "../../../assets/theme/typography";
import colors from "../../../assets/theme/colors";


type Props = {
    route: any;
    navigation: any;
  };
  type Params = {
    postID: UserPost['id'],
    loggedInUser: User,
  };
  

export const ChatCardScreen = ({route,navigation}:Props) => {
  const { postID, loggedInUser}: Params = route.params;
  const [post, setPost] = useState<UserPost | undefined>(undefined);
  const {  loading, deleteCommentFromPost, addCommentToPost, deleteEmojiFromPost, addEmojiToPost } = useUserPostsActions();
 
  useEffect(() => {
    const subscriber = onSnapshotSelectedPost(postID, (p) => setPost(p));
    return () => subscriber && subscriber();

  }, [postID]);
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <Menu />
      <GoBackButton />
      {post && (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {post.imageURL ? (
            <ChatCardWithActivity post={post} />
          ) : (
            <View style={styles.postDetails}>
              <Text style={styles.username}>{post.userFirstName} {post.userLastName}</Text>
              <ChatCardDate date={post.date} />
              {/* <Text style={styles.changedText}>ändrats</Text> */}
            </View>
          )}
          <View style={styles.emojiDetails}>
          <ChatCardDescription description={post.description} />
          <ChatCardEmoji
            loggedInUser={loggedInUser}
            deleteEmoji={(emoji: PostEmoji) => deleteEmojiFromPost(emoji, post.id)}
            addEmoji={(emoji: PostEmoji) => addEmojiToPost(emoji, post.id)}
            emoji={post.emoji}
            showAllEmojis={true}
          />
          </View>
          <CommentsSection
            comments={post.comments}
            addComment={(comment: Comment) => addCommentToPost(comment, post.id)}
            loggedInUser={loggedInUser}
            deleteComment={(comment: Comment) => deleteCommentFromPost(comment, post.id)}
            postID={post.id}
          />
          <BottomLogo />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  username: {
    ...typography.b1, 
    fontWeight: 'bold',
    marginHorizontal:10,
  },
  postDetails:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:10,
    backgroundColor:colors.background,
  },
  emojiDetails:{
    backgroundColor:colors.background,
    marginHorizontal:10,
    marginBottom:20
  }
});
