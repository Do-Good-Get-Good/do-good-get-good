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
import { useRoute } from "@react-navigation/native";
import { Activity, UserPost } from "../utility/types";
import { ChatCardHeader } from "../components/ChartCard/ChatCardHeader";
import { ActivityItem } from "../components/ChartCard/ActivityItem";
import { LongButton } from "../components/Buttons/LongButton";
import { useNavigation } from "@react-navigation/native";
import { UserStack } from "../utility/routeEnums";
import { GoBackButton } from "../components/Buttons/GoBackButton";



type props={
  activity:Activity[]
  post:UserPost
}


export const AddOrEditPost = ({activity,post}:props) => {
  const route = useRoute();
  // const { activity } = route.params;

  const [text, setText] = useState('');


  const navigation = useNavigation<{
    navigate: (nav: UserStack) => void;
  }>();




  const samplePost = {
    id: "1",
    userID: "user1",
    userFirstName: "John",
    userLastName: "Johansson",
    activityID: "activity1",
    activityCity: "Göteborg",
    activityTitle: "Blodgivning",
    changed: false,
    date: new Date(),
    description: "Det var so roligt!",
    emoji: [],
    imageURL: "symbol_hands_heart-DEFAULT",
    comments: [],
  };

  
  return (
    <SafeAreaView style={styles.container}>
      <Menu/>
      <GoBackButton/>
      <ScrollView>
      <ChatCardHeader post={samplePost}/>
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
    fontSize: 60,
    color:colors.secondary
  },
  image:{
     marginVertical:20,
     minWidth: 300, 
     minHeight: 200,
     backgroundColor:colors.disabled,
     justifyContent: 'center', 
     alignItems: 'center',
     marginHorizontal:40,
  },
  inputContainer:{
    // flex: 1, 
    justifyContent:'space-between',
     alignItems: 'center'

  },
  inpuField:{
    flex: 1,
    marginVertical:20,
    borderWidth: 1, 
    borderColor: colors.dark,
    padding: 10,
    marginBottom: 20,
  },
  longButton:{
    alignSelf: 'stretch',
    marginVertical:10,
    marginHorizontal:10,
    
  }
  
});

