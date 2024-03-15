import React from "react";
import {
  SafeAreaView,StyleSheet,Text
} from "react-native";
import { ChatCard } from "../components/ChartCard/ChatCard";

export const Chat = () => {
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style= {styles.paragraph}> Chat Screen!</Text>  
      <ChatCard/> 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'flex-start',
  },
  paragraph:{
  fontSize:16,
  fontWeight:"bold",
  textAlign: 'center',
  }  
});

