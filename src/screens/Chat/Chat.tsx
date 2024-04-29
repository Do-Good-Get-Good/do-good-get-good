import React, { useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ChatCard } from "../../components/ChartCard/ChatCard";
import BottomLogo from "../../components/BottomLogo";
import Menu from "../../components/Menu";
import { LongButton } from "../../components/Buttons/LongButton";
import { TextInput } from "react-native";
import colors from "../../assets/theme/colors";
import { Activity, Comment, UserPost } from "../../utility/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityListOverLay } from "../../components/ChartCard/ActivityListOverLay";
import { UserStack } from "../../utility/routeEnums";
import { useChat } from "./useChat";
import { useUserPostsActions } from "./useUserPostsActions";

const users = [
  {
    id: "user1",
    activitiesAndAccumulatedTime: [],
    connectedActivities: [],
    firstName: "Erik",
    lastName: "Andersson",
    statusActive: true,
  },
  {
    id: "user2",
    activitiesAndAccumulatedTime: [],
    connectedActivities: [],
    firstName: "Jerom",
    lastName: "Karlsson",
    statusActive: false,
  },
];

const activitiesFacke: Activity[] = [
  {
    id: "1",
    title: "Blodgivningvfddgdfg",
    city: "Malmo",
    photo: "asgdxhasjdhas",
  },
  {
    id: "2",
    title: "Secondhand",
    city: "Karlstad",
    photo: "sjashdjas",
  },
  {
    id: "3",
    title: "Blodgivning",
    city: "Karlstad",
    photo: "bondi_surfing.jpg",
  },
  {
    id: "4",
    title: "Blodgivare",
    city: "GGöteborg",
    photo: "machu_picchu.jpg",
  },
];

type Props = {
  navigation: any;
  route: any;
};

export const Chat = ({ navigation, route }: Props) => {
  const { getChatData } = route.params;
  const { posts } = useChat(getChatData);
  const { onDelete, loading } = useUserPostsActions();

  const [showOverlay, setShowOverlay] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollTo({ y: 0 });
  };
  const handleAddComment = () => {};

  const onCreatePostButtonPressed = () => {
    // request to get activity
    // setActivities()  then (   setShowOverlay(true); )
    setActivities(activitiesFacke);
    setShowOverlay(true);
  };

  const onChooseActivity = (post: UserPost) => {
    navigation.navigate(UserStack.AddOrEditPost, {
      post,
      toEdit: false,
    });
    setShowOverlay(false);
  };

  // const issmaller = (post: UserPost) => {
  //   const oneYearAgo = new Date();
  //   oneYearAgo.setMinutes(oneYearAgo.getMinutes() - 5);
  //   // const oneYearAgo = new Date(now.getTime() + 50000);
  //   console.log(post.description);
  //   console.log(post.date, " ---- post.date");
  //   console.log(oneYearAgo, " ---- oneYearAgo");
  //   console.log(post.date < oneYearAgo, " ---- oneYearAgo");
  // };

  return (
    <SafeAreaView style={styles.container}>
      <Menu />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {posts.map((post, i) => (
          <ChatCard
            key={`${post.id}-${i}`}
            post={post}
            users={users}
            onDelete={() => onDelete(post)}
            handleAddComment={handleAddComment}
          />
        ))}
        <LongButton
          style={styles.longButton}
          title="Skapa inlägg"
          onPress={onCreatePostButtonPressed}
        />

        <ActivityListOverLay
          onBackdropPress={() => setShowOverlay(false)}
          visible={showOverlay}
          user={users[0]}
          activities={activities}
          onActivityPress={onChooseActivity}
        />

        <TextInput
          style={styles.inputField}
          placeholder="Skriv ett meddelande"
        />
        <BottomLogo />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
  scrollViewContent: {},
  longButton: {
    margin: 20,
    borderRadius: 5,
  },
  inputField: {
    borderWidth: 1,
    padding: 6,
    marginHorizontal: 20,
    backgroundColor: colors.background,
    borderColor: colors.dark,
    color: colors.dark,
    marginBottom: 50,
  },
});
