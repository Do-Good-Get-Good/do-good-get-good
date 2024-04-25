import React, { useEffect, useRef, useState } from "react";
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
    title: "Blodgivning",
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
  const [message, setMessage] = useState('');

  const [showOverlay, setShowOverlay] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

 

  const handleMessageChange = (text:string) => {
    setMessage(text);

  };

  const handleMessageSubmit = () => {
    console.log("Submitted message:", message);
    setMessage('');
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

  return (
    <SafeAreaView style={styles.container}>
      <Menu />
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef?.current?.scrollToEnd({ animated: true })}>
        {posts.map((post, i) => (
          <ChatCard
            key={`${post.id}-${i}`}
            post={post}
            users={users}
            handleAddComment={handleAddComment}
            currentUserId='user1'
          />
        ))}

      {/* <View style={styles.messageContainer}>
        <Text style={styles.messageText}>{message}</Text>
      </View> */}
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
          // value={message}
          // onChangeText={handleMessageChange}
          // onSubmitEditing={handleMessageSubmit}
          // returnKeyType="send" 
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

  messageContainer: {
    padding: 10,
    backgroundColor:colors.background,
    maxWidth:'80%',
    borderRadius: 5,
  },
  messageText: {
    fontSize: 16,
  },
});
