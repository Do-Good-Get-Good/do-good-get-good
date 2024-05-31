import React, { useRef, useState } from "react";
import { FlatList, ScrollView, StyleSheet } from "react-native";
import BottomLogo from "../../components/BottomLogo";
import Menu from "../../components/Menu";
import { LongButton } from "../../components/Buttons/LongButton";
import { Activity, UserPost } from "../../utility/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityListOverLay } from "../../components/ChartCard/ActivityListOverLay";
import { UserStack } from "../../utility/routeEnums";
import { useChat } from "./useChat";
import { useUserPostsActions } from "./useUserPostsActions";
import { AllPosts } from "./AllPosts";

type Props = {
  navigation: any;
  route: any;
};

export const Chat = ({ navigation, route }: Props) => {
  const { getChatData } = route.params;
  const { onDeletePost, loading, addEmojiToPost, deleteEmojiFromPost } =
    useUserPostsActions();
  const { posts, loggedInUser, setlimit, getAllActivitiesConnectedToUser } =
    useChat(getChatData);
  const [showOverlay, setShowOverlay] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);

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
      {loggedInUser && (
        <>
          <AllPosts
            setlimit={() => setlimit((limit) => (limit += 2))}
            posts={posts}
            addEmoji={addEmojiToPost}
            onDelete={onDeletePost}
            deleteEmoji={deleteEmojiFromPost}
            loggedInUser={loggedInUser}
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
