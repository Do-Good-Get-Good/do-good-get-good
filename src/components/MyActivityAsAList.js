import React, { useContext, useState, useEffect } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Icon } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import CalendarView from "./CalendarView";
import { useActivityFunction } from "../context/ActivityContext";

export const MyActivityAsAList = ({ navigation, showAllList }) => {
  const [oneMoreRender, setOneMoreRender] = useState(false);

  const entryTime = useActivityFunction();
  const rout = useRoute();

  const [visible, setVisible] = useState(false);
  const [activity, setActivity] = useState([]);
  const [timeEntryList, setTimeEntryList] = useState([]);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    let activityAndTimeEntryArray = [];
    if (rout.name === "HomePage") {
      if (entryTime.timeAndStatus.length > timeEntryList.length) {
        for (let i = 0; i < entryTime.timeAndStatus.length; i++) {
          for (let j = 0; j < entryTime.myActivities.length; j++) {
            if (
              entryTime.myActivities[j].id ===
              entryTime.timeAndStatus[i].activityId
            ) {
              const myTimeAndTitle = {
                title: entryTime.myActivities[j].title,
                date: entryTime.timeAndStatus[i].date,
                statusConfirmed: entryTime.timeAndStatus[i].statusConfirmed,
                time: entryTime.timeAndStatus[i].time,
                timeEntryID: entryTime.timeAndStatus[i].fbDocumentID,
              };
              activityAndTimeEntryArray.push(myTimeAndTitle);
              setTimeEntryList(activityAndTimeEntryArray);
            }
          }
        }
      }
    } else if (rout.name === "MyTimePage") {
      if (showAllList.length > timeEntryList.length) {
        for (let i = 0; i < showAllList.length; i++) {
          for (let j = 0; j < entryTime.myActivities.length; j++) {
            if (entryTime.myActivities[j].id === showAllList[i].activityId) {
              const myTimeAndTitle = {
                title: entryTime.myActivities[j].title,
                date: showAllList[i].date,
                statusConfirmed: showAllList[i].statusConfirmed,
                time: showAllList[i].time,
                timeEntryID: showAllList[i].fbDocumentID,
              };
              activityAndTimeEntryArray.push(myTimeAndTitle);
              setTimeEntryList(activityAndTimeEntryArray);
              setOneMoreRender(true);
            }
          }
        }
      }
    } else {
      console.log("No rout");
    }
  }, [
    entryTime.timeAndStatus,
    entryTime.myActivities,
    showAllList,
    rout,
    oneMoreRender,
  ]);

  const pressedButtonShowAll = () => {
    entryTime.getIfoFromActivitiesList(true);
    navigation.navigate("MyTimePage");
  };

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
                color={activity.statusConfirmed ? "#333333" : "#333333"}
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
        <TouchableOpacity onPress={pressedButtonShowAll}>
          <LinearGradient
            colors={["#84BD00", "#5B6770"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buttonBorderStyle}
          >
            <Text style={styles.textVissaAll}>Visa allt</Text>
          </LinearGradient>
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
    color: "#333333",
  },

  textVissaAll: {
    flex: 1,
    letterSpacing: 1,
    backgroundColor: "#F5F5F5",

    marginVertical: 1,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#F5F5F5",
    textAlign: "center",

    paddingTop: 12,
    paddingHorizontal: 58,

    overflow: "hidden",
    fontSize: 20,
    // flex: 1,
    // width: 158,

    // marginTop: 10,
    // marginBottom: 15,
    // borderRadius: 5,
    // borderWidth: 1,
    // borderColor: "#84BD00",
    // textAlign: "center",

    // paddingVertical: 10,
    // fontWeight: "bold",
    // overflow: "hidden",
    // fontSize: 20,
  },
  activityIside: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    paddingHorizontal: 5,

    paddingVertical: 5,
  },
  buttonBorderStyle: {
    borderRadius: 5,
    height: 55,
    width: 200,
    alignItems: "center",
    // justifyContent: "center",
    marginTop: 12,
  },
});
