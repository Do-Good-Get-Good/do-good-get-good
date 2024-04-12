import React from "react";
import {StyleSheet,
  Text,
  Image,
  View
} from "react-native";

import { getImageForActivity } from "../../lib/images";
import { LocationIcon } from "../../assets/icons/LocationIcon";
import typography from "../../assets/theme/typography";
import colors from "../../assets/theme/colors";
import { Activity } from "../../utility/types";

type Props ={
  activityItem: Activity
}

export const ActivityItem = ({activityItem }: Props) => {

  return (
       <View style={styles.detailsContainer}>
        <View>
        <Text style={styles.textTitle} >{activityItem.title}</Text>
        <View style={styles.locationContainer}>
          <LocationIcon style={{paddingTop:3}} size={19}/>
          <Text style={styles.textCity}>{activityItem.city}</Text>
        </View> 
        </View>
        <Image  source={getImageForActivity(activityItem.photo) }  style={styles.image}/>
     </View>
  );
};

const styles = StyleSheet.create({
 
    detailsContainer:{
      //  backgroundColor:colors.background,
       flexDirection:'row',
       marginVertical:10,
       marginHorizontal:50,
       borderRadius:70
    },
    image:{
      width: 60,
      height: 60,
      marginStart:60
    },
    textTitle: {
      ...typography.cardTitle,
      color: colors.dark,
    },
    textCity:{
   ...typography.b2,
      color: colors.dark,
    }, 
    locationContainer:{
      flexDirection:'row', 
    },     
});
