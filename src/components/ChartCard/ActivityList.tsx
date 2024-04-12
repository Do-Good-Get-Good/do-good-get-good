import React, { useState } from "react";
import {
  View,StyleSheet,Text,Image, ScrollView
} from "react-native";
import { Activity } from "../../utility/types";
import { ActivityItem } from "./ActivityItem";
// import { Overlay } from "@rneui/base";
import colors from "../../assets/theme/colors";
import typography from "../../assets/theme/typography";


type Props ={
    activities: Activity[]
  }
  
export const ActivityList = ({activities}: Props) => {
  // const [visible, setVisible] = useState(false);
  
  return (
    <ScrollView style={styles.contentScrollView}>
    <View>
    <Text style={styles.header}>
    Vilken aktivitet vill du berätta om?
    </Text>
      {activities.map((activity, index) => (
        <View style={styles.itemContainer} key={index}>
          <ActivityItem activityItem={activity} />
        </View>
      ))}
    </View>
    </ScrollView>
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
        // backgroundColor: colors.light,
        // width: "90%",
        // maxHeight: "75%",
        // borderRadius: 5,
        // margin: 0,
        // padding: 0,
      },
});
