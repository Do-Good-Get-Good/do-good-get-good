import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ChatCard } from "../../components/ChartCard/ChatCard";
import BottomLogo from "../../components/BottomLogo";
import Menu from "../../components/Menu";
import { LongButton } from "../../components/Buttons/LongButton";
import { TextInput } from "react-native";
import colors from "../../assets/theme/colors";
import { Activity, ChatMessage, Comment, Post, UserPost } from "../../utility/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityListOverLay } from "../../components/ChartCard/ActivityListOverLay";
import { UserStack } from "../../utility/routeEnums";
import { useChat } from "./useChat";
import { useUserPostsActions } from "./useUserPostsActions";
import { MessageCard } from "../../components/ChartCard/MessageCard";



const post = {
  id: '1',
  userID: 'user1',
  userFirstName: "Jerom",
  userLastName: "Karlsson",
  message: "Jag kommer att vara där nästa gång!",
  date: new Date(),
  comments: [],
};


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

type Props = {
  navigation: any;
  route: any;
};

export const Chat = ({ navigation, route }: Props) => {
  const { getChatData } = route.params;

  const { onDelete, loading } = useUserPostsActions();
  const { posts, loggedInUser, getAllActivitiesConnectedToUser } =
    useChat(getChatData);

  const [showOverlay, setShowOverlay] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const [message, setMessage] = useState<string>("");

  const handleAddComment=()=>{};
 


  const handleAddMessage = async () => {


    const newMessage: ChatMessage = {
      id:'1',
        userID: loggedInUser?.id || "",
        userFirstName: loggedInUser?.firstName || "",
        userLastName: loggedInUser?.lastName || "",
        message: message.trim(), 
        date: new Date(),
        type: Post.message,
      };

      // try {
      //     await addChatMessage(newMessage);
      //     setMessage("");
      //   } catch (error) {
      //     console.error("Error adding message:", error);
      //   }

    console.log(newMessage);
   setMessage("");
  };


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
            {posts.map((post, i) => (
              <ChatCard
                key={`${post.id}-${i}`}
                post={post}
                users={users}
                handleAddComment={handleAddComment}
                onDelete={() => onDelete(post)}
                isCurrentUser={post.userID === loggedInUser?.id}
              />
            ))}


       {/* <MessageCard
        post={post}
        handleAddComment={handleAddComment}
        onDelete={()=>{}}
        isCurrentUser={post.userID === loggedInUser?.id}
      /> */}
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
            <TextInput
              style={styles.inputField}
              placeholder="Skriv ett meddelande"
              value={message}
              onChangeText={(text) => setMessage(text)}
              onSubmitEditing={handleAddMessage} 
            />
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
