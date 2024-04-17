import React, { useState } from "react";
import {
  Image,
  SafeAreaView,ScrollView,StyleSheet,Text, TextInput, TouchableOpacity, View
} from "react-native";
import BottomLogo from '../components/BottomLogo';
import Menu from '../components/Menu';
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";
import { Icon} from "@rneui/base";

import { Activity, UserPost } from "../utility/types";
import { ChatCardHeader } from "../components/ChartCard/ChatCardHeader";
import { ActivityItem } from "../components/ChartCard/ActivityItem";
import { LongButton } from "../components/Buttons/LongButton";
import { useNavigation } from "@react-navigation/native";
import { UserStack } from "../utility/routeEnums";
import { GoBackButton } from "../components/Buttons/GoBackButton";



type Props = {
  route: any;
  navigation: any;
};
type Params = {
  post: UserPost
}

export const AddOrEditPost = ({route,navigation}:Props) => {
    const {post  }:Params = route.params;
  const [text, setText] = useState(post.description);




  


  // const samplePost = {
  //   id: "1",
  //   userID: "user1",
  //   userFirstName: "John",
  //   userLastName: "Johansson",
  //   activityID: "activity1",
  //   activityCity: "Göteborg",
  //   activityImage:'',
  //   activityTitle: "Blodgivning",
  //   changed: false,
  //   date: dateString,
  //   description: "Det var so roligt!",
  //   emoji: [],
  //   imageURL: "symbol_hands_heart-DEFAULT",
  //   comments: [],
  // };

  
  return (
    <SafeAreaView style={styles.container}>
      <Menu/>
      <GoBackButton/>
      <ScrollView>
      {/* <ChatCardHeader post={samplePost}/> */}
      <TouchableOpacity onPress={()=>{}}>
          <View style={styles.image}>
            <Text style={styles.imageText}>Lägga till bild</Text>
            <Text  style={styles.buttonText }>+</Text>
          </View>
        </TouchableOpacity>
      <View  style={styles.inputContainer}>
        <TextInput
        multiline
        value={text}
        onChangeText={setText}
        placeholder="Skriv dina tankar"
        style={styles.inpuField}
        scrollEnabled={true}/>
      <LongButton
      title="Spara"
      onPress={()=>{}}
      style={styles.longButton}/>
    </View>
      <BottomLogo/>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  imageText:{
    ...typography.b2,
    color:colors.secondary,
  },
  buttonText:{
    fontSize: 80,
    color:colors.secondary
  },
  image:{
     marginVertical:20,
     minWidth: 300, 
     minHeight: 250,
     backgroundColor:colors.disabled,
     justifyContent: 'center', 
     alignItems: 'center',
     marginHorizontal:40,
  },
  inputContainer:{
    justifyContent:'space-between',
  },
  inpuField:{
    flex: 1,
    marginVertical:20,
    padding: 10,
    marginBottom: 20,
    ...typography.b1,
    marginHorizontal:40
  },
  longButton:{
    alignSelf: 'stretch',
    marginVertical:10,
    marginHorizontal:30,  
  } 
});

