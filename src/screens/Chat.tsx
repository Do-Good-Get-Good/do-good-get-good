import React from "react";
import {
  SafeAreaView,ScrollView,StyleSheet,Text
} from "react-native";
import { ChatCard } from "../components/ChartCard/ChatCard";
import BottomLogo from '../components/BottomLogo';
import Menu from '../components/Menu';
import typography from "../assets/theme/typography";

export const Chat = () => {
  
  return (
    <SafeAreaView style={styles.container}>
      <Menu/>
      <ChatCard/> 
      <BottomLogo/>
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
});

