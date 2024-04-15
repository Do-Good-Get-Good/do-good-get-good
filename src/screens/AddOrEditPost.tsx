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
      <View style={styles.titleAndBackButton}>
        <TouchableOpacity
          testID="buttonGoBack"
          onPress={() =>{navigation.navigate(UserStack.Chat) }}
        >
          <Icon
            name="arrow-back"
            color={colors.dark}
            size={30}
            style={styles.backIconContainerStyle}
          />
        </TouchableOpacity>
        <Text style={styles.textTitle}>Go till backa</Text>
      </View>
      <ScrollView>
      <ChatCardHeader post={samplePost}/>
      <TouchableOpacity onPress={()=>{}}>
          <View style={styles.image}>
            <Text style={styles.imageText}>Lägga till bild</Text>
            <Text  style={styles.buttonText }>+</Text>
          </View>
        </TouchableOpacity>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TextInput
        multiline
        value={text}
        onChangeText={setText}
        placeholder="Skriv dina tankar"
        style={styles.inpuField}/>
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
  titleAndBackButton: {
    flexDirection: "row",
    marginRight: 16,
    height: 50,
    paddingBottom: 10,
  },
  backIconContainerStyle: {
    width: 50,
    height: 50,
    justifyContent: "center",
  },
  textTitle: {
    ...typography.b1,
    fontWeight:'bold',
    color: colors.dark,
    alignSelf: "flex-end",
  },
  imageText:{
    ...typography.b2
  },
  buttonText:{
    fontSize: 100,color:colors.dark
  },
  image:{
     marginVertical:20,
     width: 300, 
     height: 300,
     backgroundColor:colors.secondary,
     justifyContent: 'center', 
     alignItems: 'center',
     marginHorizontal:40,
  },
  inpuField:{
    marginVertical:20,
    borderWidth: 1, 
    borderColor: colors.dark,
    width: '80%',
    minHeight: 100,
    padding: 10 ,
  },
  longButton:{
    marginVertical:10,
    marginHorizontal:10,
    width:'80%'
  }
  
});

