import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View
} from "react-native";
import { UserPost } from "../../utility/types";
import { Icon } from "@rneui/base";


type Props ={
  post: UserPost;
}

export const ChatCardHeader = ({post }: Props) => {

  return (
    <SafeAreaView style={styles.container}>
      <Text> ChatCard Header!</Text> 
      <View style={styles.detailsContainer}>
      <Image  source={require('../../assets/images/activities/symbol_hands_heart-DEFAULT.png')}  style={styles.image}/>
         <View style={styles.details}>
      <Text>{post.activityTitle}</Text>
      <Text>{post.userFirstName} {post.userLastName}</Text>
        </View>
      </View>
      <View style={styles.locationContainer}>
            <Icon
                  type="material-community"
                  name="map-marker-outline"
                  size={20}
                />
            <Text>{post.activityCity}</Text>
      </View>
      {/* <Text>{post.activityCity}</Text> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container:{
       justifyContent: 'center',
    },
    detailsContainer:{
      flexDirection:'row',
      alignItems: 'center'
    },
    image:{
      width: 60,
      height: 60,
      marginRight: 20,
      marginLeft: 20,
    },
    details:{
      flex:1
    },
    locationContainer:{
      flexDirection:'row',
      alignItems: 'center',
      marginRight:20,
      marginLeft:20
    },     
});
