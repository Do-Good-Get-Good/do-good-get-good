import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Icon } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import CalendarView from "./CalendarView";
import { useActivityFunction } from "../context/ActivityContext";
import { format } from "date-fns";
import toDate from "date-fns/toDate";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";

export const MyActivityAsAList = ({ navigation, showAllList }) => {
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
    if (
      rout.name === "HomePage" &&
      entryTime.timeAndStatus.length != 0 &&
      entryTime.myActivities.length != 0
    ) {
      if (entryTime.timeAndStatus.length > timeEntryList.length) {
        for (let i = 0; i < entryTime.timeAndStatus.length; i++) {
          for (let j = 0; j < entryTime.myActivities.length; j++) {
            if (
              entryTime.myActivities[j].id ===
              entryTime.timeAndStatus[i].activityId
            ) {
              const myTimeAndTitle = {
                title: entryTime.myActivities[j].title,
                date: entryTime.timeAndStatus[i].date.toDate(),
                statusConfirmed: entryTime.timeAndStatus[i].statusConfirmed,
                time: entryTime.timeAndStatus[i].time,
                timeEntryID: entryTime.timeAndStatus[i].fbDocumentID,
              };
              activityAndTimeEntryArray.push(myTimeAndTitle);
            }
          }
        }
        setTimeEntryList(activityAndTimeEntryArray);
      }
    } else if (
      rout.name === "MyTimePage" &&
      entryTime.timeAndStatus.length != 0 &&
      entryTime.myActivities.length != 0
    ) {
      if (showAllList.length > timeEntryList.length) {
        for (let i = 0; i < showAllList.length; i++) {
          for (let j = 0; j < entryTime.myActivities.length; j++) {
            if (entryTime.myActivities[j].id === showAllList[i].activityId) {
              const myTimeAndTitle = {
                title: entryTime.myActivities[j].title,
                date: showAllList[i].date.toDate(),
                statusConfirmed: showAllList[i].statusConfirmed,
                time: showAllList[i].time,
                timeEntryID: showAllList[i].fbDocumentID,
              };
              activityAndTimeEntryArray.push(myTimeAndTitle);
            }
          }
        }
        setTimeEntryList(activityAndTimeEntryArray);
      }
    }
  }, [entryTime.timeAndStatus, entryTime.myActivities, showAllList, rout]);

  const pressedButtonShowAll = () => {
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
              color: !activity.statusConfirmed ? colors.dark : colors.secondary,
              flex: 1.5,
              ...typography.b2,
              paddingTop: 10,
            }}
          >
            {activity.title}
          </Text>
          <Text
            style={{
              color: !activity.statusConfirmed ? colors.dark : colors.secondary,
              flex: 1,
              ...typography.b2,
              marginLeft: 13,
              paddingTop: 10,
            }}
          >
            {format(activity.date, "yyyy-MM-dd")}
          </Text>
          <Text
            style={{
              color: !activity.statusConfirmed ? colors.dark : colors.secondary,
              flex: 0.6,
              ...typography.b2,
              paddingTop: 10,
            }}
          >
            {activity.time} tim
          </Text>
          {!activity.statusConfirmed ? (
            <TouchableOpacity
              testID="editButton"
              onPress={() => {
                setActivity(activity);
                toggleOverlay();
              }}
            >
              <Icon
                style={{ paddingTop: 5 }}
                color={colors.dark}
                name="pencil-outline"
                type="material-community"
                size={25}
              />
            </TouchableOpacity>
          ) : (
            <Icon
              style={{ paddingTop: 5 }}
              color={colors.secondary}
              name={"done"}
              size={25}
            />
          )}
        </View>
      ))}
      {rout.name === "HomePage" ? (
        <TouchableOpacity testID="showAllButton" onPress={pressedButtonShowAll}>
          <LinearGradient
            colors={[colors.primary, colors.secondary]}
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
    ...typography.h2,
    marginTop: 30,
    marginBottom: 10,
    color: colors.dark,
  },

  textVissaAll: {
    flex: 1,
    letterSpacing: 1,
    backgroundColor: colors.light,
    marginVertical: 1,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.light,
    textAlign: "center",
    paddingTop: 12,
    paddingHorizontal: Platform.OS === "ios" ? 56 : 58,
    overflow: "hidden",
    ...typography.button.lg,
    fontWeight: "500",
    color: colors.dark,
  },
  activityIside: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.background,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  buttonBorderStyle: {
    borderRadius: 5,
    height: 55,
    width: 200,
    alignItems: "center",
    marginTop: 12,
  },
});
