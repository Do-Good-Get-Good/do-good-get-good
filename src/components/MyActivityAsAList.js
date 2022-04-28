import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  FlatList,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Icon, Overlay } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import CalendarView from "./CalendarView";
import { useActivityFunction } from "../context/ActivityContext";
import { format, set } from "date-fns";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";
import DropDownForSorting from "./DropDownForSorting";

function MyActivityAsAList({ navigation }) {
  const entryTime = useActivityFunction();
  const rout = useRoute();
  const [visible, setVisible] = useState(false);
  const [activity, setActivity] = useState([]);
  const [timeEntryListOnlyFive, setTimeEntryListOnlyFive] = useState([]);
  const [timeEntryList, setTimeEntryList] = useState([]);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const [timeEntriesTwoMonthsBefore, seTimeEntriesTwoMonthsBefore] = useState(
    []
  );

  useEffect(() => {
    if (rout.name === "HomePage" && entryTime.lastFiveTimeEntries.length != 0) {
      let firstFiveTimeEntries = objectsWithActivitiesAndTimeEntriesInfo(
        entryTime.lastFiveTimeEntries,
        true
      );
      setTimeEntryListOnlyFive(firstFiveTimeEntries);
    } else if (
      rout.name === "MyTimePage" &&
      entryTime.allListOfTimeEntry.length != 0
    ) {
      let allOnSnapshotTimeEntries = objectsWithActivitiesAndTimeEntriesInfo(
        entryTime.allListOfTimeEntry,
        true
      );
      setTimeEntryList(allOnSnapshotTimeEntries);
    }
  }, [entryTime.lastFiveTimeEntries, entryTime.allListOfTimeEntry]);

  useEffect(() => {
    if (
      entryTime.scrollToGetMoreTimeEntries.length != 0 &&
      entryTime.addMoreTimeEntriesAfterScroll
    ) {
      let timeEntriesAfterScroll = objectsWithActivitiesAndTimeEntriesInfo(
        entryTime.timeEntriesAfterScrolling,
        false
      );

      seTimeEntriesTwoMonthsBefore(timeEntriesAfterScroll);
      entryTime.setAddMoreTimeEntriesAfterScroll(false);
    }
  }, [entryTime.addMoreTimeEntriesAfterScroll]);

  function objectsWithActivitiesAndTimeEntriesInfo(
    timeEntries,
    possibleToMakeChanges
  ) {
    let activityAndTimeEntryArray = [];
    let myTimeAndTitle = {};

    for (let i = 0; i < timeEntries.length; i++) {
      myTimeAndTitle = {
        adminID: timeEntries[i].admin_id,
        timeEntryID: timeEntries[i].doc_id,
        date: timeEntries[i].date.toDate(),
        statusConfirmed: timeEntries[i].status_confirmed,
        time: timeEntries[i].time,
        title: timeEntries[i].activity_title,
        id: timeEntries[i].activity_id,
        possibleToMakeChanges: possibleToMakeChanges,
      };

      activityAndTimeEntryArray.push(myTimeAndTitle);
    }

    return activityAndTimeEntryArray;
  }

  const pressedButtonShowAll = () => {
    navigation.navigate("MyTimePage");
  };

  function viewOfTimeEntries(activity, key, possibleToMakeChanges) {
    return (
      <View index={key} key={key} style={styles.activityIside}>
        <Text
          style={{
            fontWeight: !activity.statusConfirmed ? "bold" : "normal",
            color: !activity.statusConfirmed ? colors.dark : colors.secondary,
            flex: 1,
            ...typography.b2,
          }}
        >
          {activity.title}
        </Text>
        <Text
          style={{
            color: !activity.statusConfirmed ? colors.dark : colors.secondary,
            flex: 1,
            ...typography.b2,
            textAlign: "center",
          }}
        >
          {format(activity.date, "yyyy-MM-dd")}
        </Text>
        <Text
          style={{
            color: !activity.statusConfirmed ? colors.dark : colors.secondary,
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
              if (possibleToMakeChanges) {
                setActivity(activity);
                toggleOverlay();
              } else {
                setShowErrorMessage(true);
              }
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
    );
  }

  function showTimeEntriesList() {
    return (
      <View style={styles.container}>
        <View
          style={{
            paddingHorizontal: 8,
            backgroundColor: colors.background,
            borderRadius: 2,
          }}
        >
          {(timeEntryListOnlyFive.length === 0 && rout.name === "HomePage") ||
            (rout.name === "MyTimePage" &&
              timeEntryList.length === 0 &&
              timeEntriesTwoMonthsBefore.length === 0 && (
                <Text style={{ ...typography.b2 }}>
                  Du har inte loggat någon tid ännu!
                </Text>
              ))}
          {rout.name === "HomePage" ? (
            timeEntryListOnlyFive.map((activity, index) =>
              viewOfTimeEntries(activity, index, true)
            )
          ) : (
            <View style={{ maxHeight: 600 }}>
              <FlatList
                contentContainerStyle={{ marginBottom: 20 }}
                data={[...timeEntryList, ...timeEntriesTwoMonthsBefore]}
                onEndReached={() => {
                  entryTime.setScrollToGetMoreTimeEntries(true);
                }}
                onEndReachedThreshold={0.01}
                keyExtractor={(item) => item.timeEntryID}
                renderItem={({ item }) =>
                  viewOfTimeEntries(
                    item,
                    item.timeEntryID,
                    item.possibleToMakeChanges
                  )
                }
              />
            </View>
          )}
        </View>
        {rout.name === "HomePage" ? (
          <TouchableOpacity
            testID="showAllButton"
            onPress={() => pressedButtonShowAll()}
          >
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

  return (
    <View style={styles.containerForTheWholeComponent}>
      <View style={styles.containerForTitleAndDropDown}>
        <Text style={styles.title}>Min tid</Text>
        <View style={{ backgroundColor: "pink" }}>
          <DropDownForSorting />
        </View>
      </View>

      {showTimeEntriesList()}
      <Overlay
        isVisible={showErrorMessage}
        animationType="fade"
        overlayStyle={{ fontSize: 20 }}
        onBackdropPress={() => setShowErrorMessage(false)}
      >
        <Text>Man kan inte ändra på tidsinmatningar äldre än två månader</Text>
      </Overlay>
    </View>
  );
}
export default MyActivityAsAList;

const styles = StyleSheet.create({
  containerForTheWholeComponent: {
    marginBottom: 8,
    flex: 1,
  },

  container: {
    justifyContent: "flex-start",
  },
  title: {
    flex: 0.5,
    ...typography.h2,
    color: colors.dark,
    backgroundColor: "red",
    paddingTop: 13,
  },
  containerForTitleAndDropDown: {
    flex: 1,
    flexDirection: "row",
    marginTop: 30,
    paddingBottom: 20,
    backgroundColor: "yellow",
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
  errorText: {
    fontSize: 20,
    color: colors.error,
  },
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
