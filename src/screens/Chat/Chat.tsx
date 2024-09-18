import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LongButton } from "../../components/Buttons/LongButton";
import { ActivityListOverLay } from "../../components/ChartCard/ActivityListOverLay";
import Menu from "../../components/Menu";
import { UserStack } from "../../utility/routeEnums";
import { Activity, UserPost } from "../../utility/types";
import { AllPosts } from "./AllPosts";
import { useChat } from "./useChat";
import { useUserPostsActions } from "./useUserPostsActions";

type Props = {
  navigation: any;
  route: any;
};

export const Chat = ({ navigation, route }: Props) => {
  const { getChatData, isScrollToEnd } = route.params;
  const { onDeletePost, addEmojiToPost, loading, deleteEmojiFromPost } =
    useUserPostsActions();
  const { posts, loggedInUser, setlimit, getAllActivitiesConnectedToUser } =
    useChat(getChatData);
  const [showOverlay, setShowOverlay] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);

  const onCreatePostButtonPressed = async () => {
    const activities = await getAllActivitiesConnectedToUser(
      loggedInUser?.connectedActivities ?? []
    );
    setActivities(activities);
    setShowOverlay(true);
  };

  const onChooseActivity = (post: UserPost) => {
    navigation.navigate(UserStack.AddOrEditPost, {
      post,
      toEdit: false,
    });
    route.params.isScrollToEnd = false;
    setShowOverlay(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Menu />
      {loggedInUser && (
        <>
          <AllPosts
            setlimit={() => setlimit((limit) => (limit += 20))}
            posts={posts}
            addEmoji={addEmojiToPost}
            onDelete={onDeletePost}
            deleteEmoji={deleteEmojiFromPost}
            loggedInUser={loggedInUser}
            isScrollToEnd={isScrollToEnd}
          />
          <LongButton
            style={styles.longButton}
            title="Skapa inlägg"
            onPress={onCreatePostButtonPressed}
          />
          <ActivityListOverLay
            navigation={navigation}
            onBackdropPress={() => setShowOverlay(false)}
            visible={showOverlay}
            user={loggedInUser}
            activities={activities}
            onActivityPress={onChooseActivity}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
  longButton: {
    marginHorizontal: 20,
    marginVertical: 10,

    borderRadius: 5,
  },
});
