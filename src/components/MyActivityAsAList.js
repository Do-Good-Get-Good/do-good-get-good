import React, { useState, useEffect } from "react";
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
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";

import { useIsFocused } from "@react-navigation/native";

function MyActivityAsAList({ navigation }) {
  const entryTime = useActivityFunction();
  const rout = useRoute();

  const [visible, setVisible] = useState(false);
  const [activity, setActivity] = useState([]);
  const [timeEntryList, setTimeEntryList] = useState([]);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    if (rout.name === "HomePage") {
      entryTime.setLimitAmountForTimeEntries(5);
    } else if (rout.name === "MyTimePage") {
      entryTime.setLimitAmountForTimeEntries(20);
    }
  }, [isFocused]);

  useEffect(() => {
    if (rout.name === "HomePage" && entryTime.lastFiveTimeEntries.length != 0) {
      objectsWithActivitiesAndTimeEntriesInfo(
        entryTime.lastFiveTimeEntries,
        entryTime.myActivities
      );
    } else if (
      rout.name === "MyTimePage" &&
      entryTime.allListOfTimeEntry.length != 0
    ) {
      objectsWithActivitiesAndTimeEntriesInfo(
        entryTime.allListOfTimeEntry,
        entryTime.myActivities
      );
    }
  }, [
    entryTime.lastFiveTimeEntries,
    entryTime.myActivities,
    entryTime.allListOfTimeEntry,
  ]);

  function objectsWithActivitiesAndTimeEntriesInfo(timeEntries, activities) {
    let activityAndTimeEntryArray = [];
    let myTimeAndTitle = {};

    for (let i = 0; i < timeEntries.length; i++) {
      for (let j = 0; j < activities.length; j++) {
        if (activities[j].id === timeEntries[i].activity_id) {
          myTimeAndTitle = {
            adminID: timeEntries[i].admin_id,
            timeEntryID: timeEntries[i].doc_id,
            date: timeEntries[i].date.toDate(),
            statusConfirmed: timeEntries[i].status_confirmed,
            time: timeEntries[i].time,
            id: timeEntries[i].activity_id,
            title: timeEntries[i].activity_title,
            city: activities[j].city,
          };
        } else {
          myTimeAndTitle = {
            adminID: timeEntries[i].admin_id,
            timeEntryID: timeEntries[i].doc_id,
            date: timeEntries[i].date.toDate(),
            statusConfirmed: timeEntries[i].status_confirmed,
            time: timeEntries[i].time,
            title: timeEntries[i].activity_title,
            id: timeEntries[i].activity_id,
          };
        }
      }
      activityAndTimeEntryArray.push(myTimeAndTitle);
    }
    setTimeEntryList(activityAndTimeEntryArray);
  }

  const pressedButtonShowAll = () => {
    entryTime.setLimitAmountForTimeEntries(20);
    navigation.navigate("MyTimePage");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Min tid</Text>
      <View
        style={{
          paddingHorizontal: 8,
          paddingVertical: 7.5,
          backgroundColor: colors.background,
          borderRadius: 2,
        }}
      >
        {timeEntryList.length === 0 && (
          <Text style={{ ...typography.b2 }}>
            Du har inte loggat någon tid ännu!
          </Text>
        )}
        {timeEntryList.map((activity, index) => (
          <View index={index} key={index} style={styles.activityIside}>
            <Text
              style={{
                fontWeight: !activity.statusConfirmed ? "bold" : "normal",
                color: !activity.statusConfirmed
                  ? colors.dark
                  : colors.secondary,
                flex: 1,
                ...typography.b2,
              }}
            >
              {activity.title}
            </Text>
            <Text
              style={{
                color: !activity.statusConfirmed
                  ? colors.dark
                  : colors.secondary,
                flex: 1,
                ...typography.b2,
                textAlign: "center",
              }}
            >
              {format(activity.date, "yyyy-MM-dd")}
            </Text>
            <Text
              style={{
                color: !activity.statusConfirmed
                  ? colors.dark
                  : colors.secondary,
                flex: 0.6,
                ...typography.b2,
                textAlign: "center",
                paddingRight: 5,
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
                  testID="icon"
                  color={colors.dark}
                  name="pencil-outline"
                  type="material-community"
                  size={25}
                />
              </TouchableOpacity>
            ) : (
              <Icon color={colors.secondary} name={"done"} size={25} />
            )}
          </View>
        ))}
      </View>
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
        adminID={activity.adminID}
        isEditing={true}
      />
    </View>
  );
}
export default MyActivityAsAList;

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
    flexDirection: "row",
    backgroundColor: colors.background,
    alignItems: "center",
    paddingVertical: 2.5,
  },
  buttonBorderStyle: {
    borderRadius: 5,
    height: 55,
    width: 200,
    alignItems: "center",
    marginTop: 12,
  },
});
