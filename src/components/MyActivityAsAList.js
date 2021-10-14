import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  FlatList,
  View,
  Image,
  Button,
  ListItem,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Icon } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import CalendarView from "./CalendarView";
import { useActivityFunction } from "../context/ActivityContext";

export const MyActivityAsAList = ({ navigation }) => {
  // const activityList = useActivityFunction()
  const entryTime = useActivityFunction();
  const rout = useRoute();

  const [visible, setVisible] = useState(false);
  const [activity, setActivity] = useState([]);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const [myActivity, setMyActivity] = useState([]);
  const [timeAndStatus, setTimeAndStatus] = useState([]);
  const [timeEntryList, setTimeEntryList] = useState([]);
  const [amountToShowInTheList, setAmountToShowInTheList] = useState(5);

  useEffect(() => {
    setMyActivity(entryTime.myActivities);
    setTimeAndStatus(entryTime.timeAndStatus);
  }, [entryTime]);

  useEffect(() => {
    if (timeAndStatus.length > timeEntryList.length) {
      const connectActivityNameAndTimeEntry = () => {
        for (let i = 0; i < timeAndStatus.length; i++) {
          for (let j = 0; j < myActivity.length; j++) {
            if (myActivity[j].id === timeAndStatus[i].activityId) {
              const myTimeAndTitle = {
                title: myActivity[j].title,
                date: timeAndStatus[i].date,
                statusConfirmed: timeAndStatus[i].statusConfirmed,
                time: timeAndStatus[i].time,
                timeEntryID: timeAndStatus[i].fbDocumentID,
              };

              setTimeEntryList((prev) => [...prev, myTimeAndTitle]);
            }
          }
        }
      };
      connectActivityNameAndTimeEntry();
    }
  }, [myActivity]);

  // const pressShowAllList = () => {
  //   if (rout.name === 'HomePage') {
  //     setAmountToShowInTheList(5)
  //   } else {
  //     setAmountToShowInTheList(timeAndStatus.length)
  //   }
  //   navigation.navigate('MyTimePage')
  // }

  // console.log('entryTime.timeAndStatus', entryTime.timeAndStatus)

  // console.log('entryTime.myActivities', entryTime.myActivities)
  // console.log('myActivity', myActivity)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Min tid</Text>
      {timeEntryList.map((activity, index) => (
        <View index={index} key={index} style={styles.activityIside}>
          <Text
            style={{
              fontWeight: !activity.statusConfirmed ? "bold" : "normal",
              color: !activity.statusConfirmed ? "#333333" : "gray",
              flex: 1.5,
              fontSize: 16,
              paddingTop: 10,
            }}
          >
            {activity.title}
          </Text>

          <Text
            style={{
              color: !activity.statusConfirmed ? "#333333" : "gray",
              flex: 1,
              fontSize: 16,
              marginLeft: 13,
              paddingTop: 10,
            }}
          >
            {activity.date}
          </Text>
          <Text
            style={{
              color: !activity.statusConfirmed ? "#333333" : "gray",
              flex: 0.6,
              fontSize: 16,
              paddingTop: 10,
            }}
          >
            {activity.time} tim
          </Text>
          {!activity.statusConfirmed ? (
            <TouchableOpacity
              onPress={() => {
                setActivity(activity);
                toggleOverlay();
              }}
            >
              <Icon
                style={{ paddingTop: 5 }}
                color={activity.statusConfirmed ? "#333333" : "black"}
                name="pencil-outline"
                type="material-community"
                size={25}
              />
            </TouchableOpacity>
          ) : (
            <Icon
              style={{ paddingTop: 5 }}
              color={activity.statusConfirmed ? "#333333" : "gray"}
              name={"done"}
              size={25}
            />
          )}
        </View>
      ))}
      {rout.name === "HomePage" ? (
        <TouchableOpacity onPress={() => navigation.navigate("MyTimePage")}>
          <Text style={styles.textVissaAll}>Visa allt</Text>
        </TouchableOpacity>
      ) : null}
      <CalendarView
        visible={visible}
        toggleVisibility={toggleOverlay}
        activity={activity}
        isEditing={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "flex-start",

    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontSize: 24,
    marginTop: 30,
    marginBottom: 10,
  },

  textVissaAll: {
    flex: 1,
    width: 158,

    marginTop: 10,
    marginBottom: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#84BD00",
    textAlign: "center",
    // paddingHorizontal: 10,
    paddingVertical: 10,
    fontWeight: "bold",
    overflow: "hidden",
    fontSize: 20,
  },
  activityIside: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    paddingHorizontal: 5,

    paddingVertical: 5,
  },
});

// <Text
//             style={{
//               fontWeight: activity.activityStatus ? 'bold' : 'normal',
//               textDecorationLine: activity.activityStatus
//                 ? 'underline'
//                 : null,
//               flex: 1
//             }}
//           >
