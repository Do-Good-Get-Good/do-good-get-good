import React, { useState } from "react";
import {
  SafeAreaView,ScrollView,StyleSheet,Text, View
} from "react-native";
import { ChatCard } from "../components/ChartCard/ChatCard";
import BottomLogo from '../components/BottomLogo';
import Menu from '../components/Menu';
import typography from "../assets/theme/typography";
import { LongButton } from "../components/Buttons/LongButton";
import { ActivityListOverLay } from "../components/ChartCard/ActivityListOverLay";

export const Chat = () => {
  const [showActivityList, setShowActivityList] = useState(false);
  const buttonPressing=()=>{
    console.log("Button Pressed")
    setShowActivityList(true);
  }

  const activities = [
    {id:'1',
      title: "Blodgivning",
      city: "Malmo",
      photo: "activity1.jpg",
    },
    {
      id:'2',
      title: "Secondhand",
      city: "Karlstad",
      photo: "activity2.jpg",
    },
    {id:'3',
      title: "Blodgivning",
      city: "Malmo",
      photo: "activity1.jpg",
    },
    {
      id:'4',
      title: "Secondhand",
      city: "Karlstad",
      photo: "activity2.jpg",
    },
  
  ];

  
  return (
    <SafeAreaView style={styles.container}>
      <Menu/>
      <ChatCard/> 
      {/* <View>
          <LongButton
          title="Skapa inlägg "
          onPress={buttonPressing}/>
        </View>
        {showActivityList && <ActivityListOverLay activities={activities} />} */}
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

