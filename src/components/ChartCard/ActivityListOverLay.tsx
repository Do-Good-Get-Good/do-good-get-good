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


// const createPropsObject = (activity: Activity, user: User):UserPost => { let obj = {
//   id: '',
//   userID: user.id,
//   userFirstName: user.firstName,
//   userLastName: user.lastName,
//   activityID: activity.id,
//   activityCity:activity.city,
//   activityTitle:activity.title,
//   changed:false,
//   date: new Date(),
//   description:'',
//   emoji: [],
//   imageURL: '',
//     comments: [

//     ]}
// return obj
// }



type Props ={
    activities: Activity[]
    // user: User,
  }
  
export const ActivityListOverLay = ({activities}: Props) => {
  const [visible, setVisible] = useState(true);
  const navigation = useNavigation<{
    navigate: (nav: UserStack) => void;
  }>();
//   const handlePress=(activity: Activity)=>{
//     setVisible(false)
//     navigation.navigate(UserStack.AddOrEditPost, {
// post : createPropsObject(activity,user )
//     }) 

//   }

const handlePress=()=>{
  setVisible(false)
  console.log("Activity Item selected")
  navigation.navigate(UserStack.AddOrEditPost)  
}

  return (
    <Overlay
    isVisible={visible}
    animationType="fade"
    overlayStyle={styles.overlayStyle}>
   <View>
    <ScrollView style={styles.contentScrollView}>
    <Text style={styles.header}>
    Vilken aktivitet vill du berätta om?
    </Text>
     {activities.map((activity, index) => (
        <TouchableOpacity onPress={handlePress} style={styles.itemContainer} key={index}>
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
        marginLeft: 22,
        marginTop: 14,
      },
      overlayStyle: {
        backgroundColor: colors.light,
        width: "90%",
        maxHeight: "60%",
        borderRadius: 5,
  
      }
});
