import React from "react";
import {
  View,StyleSheet,Text, ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Menu from "../../components/Menu";
import BottomLogo from "../../components/BottomLogo";
import { GoBackButton } from "../../components/Buttons/GoBackButton";
import { ChatCardHeader } from "../../components/ChartCard/ChatCardHeader";
import { UserPost } from "../../utility/types";
import { ChatCardImage } from "../../components/ChartCard/ChatCardImage";
import { ChatCardDescription } from "../../components/ChartCard/ChatCardDescription";
import { ChatCardDate } from "../../components/ChartCard/ChatCardDate";
import { ChatCardEmoji } from "../../components/ChartCard/ChatCardEmoji";
import { CommentsSection } from "../../components/ChartCard/ChatComments/CommentsSection";


type Props = {
    route: any;
    navigation: any;
  };
  type Params = {
    post: UserPost
  };
  const comments = [
    {
      id: "1",
      comment: "This is the first comment",
      userID: "user1",
      userFirstName: "John",
      userLastName: "Doe",
    },
    {
      id: "2",
      comment: "Another comment here",
      userID: "user2",
      userFirstName: "Alice",
      userLastName: "Smith",
    },
  ];

export const ChatCardScreen = ({route,navigation}:Props) => {
    const { post}: Params = route.params;


  return (
    <SafeAreaView>
        <Menu/>
        <GoBackButton/>
        <ScrollView>
        <View style={styles.container}>
        <View style={styles.headerAndDate}>
        <ChatCardHeader post={post} />
        <ChatCardDate date={post.date} />
        </View>
        <ChatCardImage imageUrl={post?.imageURL ?? ''} />
        <ChatCardDescription description={post.description} />
        
        {/* <ChatCardEmoji
            loggedInUser={}
            deleteEmoji={(emoji) => {} }
            addEmoji={(emoji) => {} }
            emoji={post.emoji}
          /> */}
          <CommentsSection comments={comments} addComment={()=>{}}/>
        </View>
        <BottomLogo/>
        </ScrollView>
   </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container:{
        marginHorizontal:20
    },
    headerAndDate:{
        flexDirection:'row',
        justifyContent: 'space-between', 
        alignItems: 'flex-end' 
    }  
});
