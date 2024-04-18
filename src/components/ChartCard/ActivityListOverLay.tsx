import React, { useState } from "react";
import {
  View,StyleSheet,Text,Image, ScrollView, TouchableOpacity
} from "react-native";
import { Activity, User, UserPost } from "../../utility/types";
import { ActivityItem } from "./ActivityItem";
import { Overlay } from "@rneui/base";
import colors from "../../assets/theme/colors";
import typography from "../../assets/theme/typography";
import { useNavigation } from "@react-navigation/native";
import { UserStack } from "../../utility/routeEnums";


const createPropsObject = (activity: Activity, user: User):UserPost => { let obj = {
  id: '',
  userID: user.id,
  userFirstName: user.firstName,
  userLastName: user.lastName,
  activityID: activity.id,
  activityCity:activity.city,
  activityTitle:activity.title,
  activityImage: activity.imageUrl ??  activity.photo ,
  changed:false,
  date: new Date().toISOString(),
  description:'',
  emoji: [],
  imageURL: '',
  comments: []
}
return obj
}

type Props ={
    activities: Activity[],
    visible: boolean
    onActivityPress:(post: UserPost)=>void;
    onBackdropPress: ()=> void,
    user: User,
  }
  
export const ActivityListOverLay = ({activities,onActivityPress, visible,user, onBackdropPress}: Props) => {

  const navigation = useNavigation<{
    navigate: (nav: UserStack) => void;
  }>();

  return (
    <Overlay
    onBackdropPress={onBackdropPress}
    isVisible={visible}
    animationType="fade"
    overlayStyle={styles.overlayStyle}>
   <View>
    <ScrollView style={styles.contentScrollView}>
    <Text style={styles.header}>
    Vilken aktivitet vill du berätta om?
    </Text>
     {activities.map((activity, index) => (
        <TouchableOpacity onPress={()=>onActivityPress(createPropsObject(activity,user))} style={styles.itemContainer} key={index}>
          <ActivityItem activityItem={activity} />
        </TouchableOpacity>
      ))}
    </ScrollView></View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
      itemContainer: {
        marginBottom: 10,
        backgroundColor:colors.background
      },
      contentScrollView: {
        backgroundColor: colors.light,
        margin:18,
        paddingHorizontal: 16,
        borderRadius: 2,
      },
      header: {
        ...typography.cardTitle,
        marginHorizontal:10,
        marginVertical:4,
      },
      overlayStyle: {
        backgroundColor: colors.light,
        width: "90%",
        maxHeight: "60%",
     }
});
