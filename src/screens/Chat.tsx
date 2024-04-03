import React from "react";
import {
  Alert,
  SafeAreaView,ScrollView,StyleSheet,Text
} from "react-native";
import { ChatCard } from "../components/ChartCard/ChatCard";
import BottomLogo from '../components/BottomLogo';
import Menu from '../components/Menu';
import typography from "../assets/theme/typography";
import { LongButton } from "../components/Buttons/LongButton";
import { TextInput } from "react-native";
import colors from "../assets/theme/colors";

export const Chat = () => {
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Menu/>
      <ChatCard/> 
      <LongButton style={styles.longButton} title="Lägg till upplevelse" onPress={()=>(Alert.alert("LongButton Pressed"))}/>
      <TextInput
      style={styles.inputField}
      placeholder="Skriv ett meddelande"/>
      <BottomLogo/>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'flex-start',
  },
  headerText: {
    ...typography.h2,
    fontWeight: '500',
    marginTop: 30,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  longButton:{
      alignItems:'center',
      borderRadius:5,
      marginRight:50,
      height:40,
      marginLeft:50 
   },
   inputField:{
    justifyContent:'center',
    borderWidth:1,
    padding:6,
    margin:10,
    backgroundColor:colors.background,
    borderColor:colors.dark,
    color:colors.dark
   }


});

