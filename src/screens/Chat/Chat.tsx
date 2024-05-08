import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import BottomLogo from "../../components/BottomLogo";
import Menu from "../../components/Menu";
import { LongButton } from "../../components/Buttons/LongButton";
import { Activity, Comment, Post, UserPost } from "../../utility/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityListOverLay } from "../../components/ChartCard/ActivityListOverLay";
import { UserStack } from "../../utility/routeEnums";
import { useChat } from "./useChat";
import { useUserPostsActions } from "./useUserPostsActions";
import { AllPosts } from "./AllPosts";
import { ChatInputField } from "./ChatInputField";
import { CommentsSection } from "../../components/ChartCard/ChatComments/CommentsSection";
import { addEmoji } from "../../firebase-functions/addTS/add";
import { deleteEmoji } from "../../firebase-functions/deleteTS/delete";



type Props = {
  navigation: any;
  route: any;
};



export const Chat = ({ navigation, route }: Props) => {
  const { getChatData } = route.params;

  const { onDelete, addPost, loading } = useUserPostsActions();
  const { posts, loggedInUser, getAllActivitiesConnectedToUser } =useChat(getChatData);
  const [showOverlay, setShowOverlay] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const handleAddComment=()=>{};
 

  const onCreatePostButtonPressed = async () => {
    const activities = await getAllActivitiesConnectedToUser(
      loggedInUser?.connectedActivities ?? [],
    );
    setActivities(activities);
    setShowOverlay(true);
  };

  const onChooseActivity = (post: UserPost) => {
    navigation.navigate(UserStack.AddOrEditPost, {
      post,
      toEdit: false,
    });
    setShowOverlay(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Menu />
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef?.current?.scrollToEnd({ animated: true })
        }
      >
        {loggedInUser && (
          <>
           <AllPosts 
           posts={posts} 
           handleAddComment={handleAddComment}
           addEmoji={ addEmoji}
           onDelete={onDelete}
           deleteEmoji={deleteEmoji}
           loggedInUser={loggedInUser}/>
            <LongButton
              style={styles.longButton}
              title="Skapa inlägg"
              onPress={onCreatePostButtonPressed}
            />
            <ActivityListOverLay
              onBackdropPress={() => setShowOverlay(false)}
              visible={showOverlay}
              user={loggedInUser}
              activities={activities}
              onActivityPress={onChooseActivity}
            />
            <ChatInputField loggedInUser={loggedInUser} addPost={addPost} />
            <BottomLogo />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
  longButton: {
    margin: 20,
    borderRadius: 5,
  }
});
