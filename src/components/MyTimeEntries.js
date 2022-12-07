import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  FlatList,
} from "react-native";
import { Icon, Overlay } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import CalendarView from "./CalendarView";
import { useActivityFunction } from "../context/ActivityContext";
import { format } from "date-fns";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";
import DropDownForSorting from "./DropDownForSorting";

function MyTimeEntries() {
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
  const [oldTimeEntriesForHomePage, setOldTimeEntriesForHomePage] = useState(
    []
  );
  const [timeEntriesTwoMonthsBefore, seTimeEntriesTwoMonthsBefore] = useState(
    []
  );
  const [selectedOptionForSorting, setSelectedOptionForSorting] =
    useState(null);

  useEffect(() => {
    let firstFiveTimeEntries = objectsWithActivitiesAndTimeEntriesInfo(
      entryTime.lastFiveTimeEntries,
      true
    );
    let oldTimeEntries = objectsWithActivitiesAndTimeEntriesInfo(
      entryTime.userHasLassThanFiveTimeEntriesForLastTwoMonthes,
      false
    );
    setTimeEntryListOnlyFive(firstFiveTimeEntries);
    setOldTimeEntriesForHomePage(oldTimeEntries);
  }, [
    entryTime.lastFiveTimeEntries,
    entryTime.userHasLassThanFiveTimeEntriesForLastTwoMonthes,
  ]);

  useEffect(() => {
    let allOnSnapshotTimeEntries = objectsWithActivitiesAndTimeEntriesInfo(
      entryTime.allListOfTimeEntry,
      true
    );
    setTimeEntryList(allOnSnapshotTimeEntries);
  }, [entryTime.allListOfTimeEntry]);

  useEffect(() => {
    if (entryTime.addMoreTimeEntriesAfterScroll || rout.name === "MyTimePage") {
      let timeEntriesAfterScroll = objectsWithActivitiesAndTimeEntriesInfo(
        entryTime.timeEntriesAfterScrolling,
        false
      );
      seTimeEntriesTwoMonthsBefore(timeEntriesAfterScroll);
      entryTime.setAddMoreTimeEntriesAfterScroll(false);
    }
  }, [entryTime.addMoreTimeEntriesAfterScroll, rout.name]);

  function objectsWithActivitiesAndTimeEntriesInfo(
    timeEntries,
    possibleToMakeChanges
  ) {
    let activityAndTimeEntryArray = [];
    let myTimeAndTitle = {};

    if (timeEntries.length != 0) {
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
    }

    return activityAndTimeEntryArray;
  }

  function counter(arrayOnSnapShot, arrayWithOldTimeEntries, amount) {
    let count = 0;
    if (selectedOptionForSorting != null) {
      for (let i = 0; i < arrayOnSnapShot.length; i++) {
        if (arrayOnSnapShot[i].statusConfirmed === selectedOptionForSorting) {
          count = count + 1;
        }
      }

      for (let j = 0; j < arrayWithOldTimeEntries.length; j++) {
        if (
          arrayWithOldTimeEntries[j].statusConfirmed ===
          selectedOptionForSorting
        ) {
          count = count + 1;
        }
      }

      if (entryTime.noMoreData != true) {
        if (count < amount) {
          entryTime.setScrollToGetMoreTimeEntries(true);
        }
      }
    } else if (selectedOptionForSorting === null) {
      if (entryTime.noMoreData != true) {
        count = arrayOnSnapShot.length + arrayWithOldTimeEntries.length;

        if (count < amount) {
          entryTime.setScrollToGetMoreTimeEntries(true);
        }
      }
    }
  }

  useEffect(() => {
    if (rout.name === "MyTimePage") {
      counter(timeEntryList, timeEntriesTwoMonthsBefore, 25);
    }
  }, [selectedOptionForSorting, timeEntryList, timeEntriesTwoMonthsBefore]);

  function viewOfTimeEntries(activity, key, index, possibleToMakeChanges) {
    if (
      selectedOptionForSorting === activity.statusConfirmed ||
      selectedOptionForSorting === null
    ) {
      return (
        <View index={index} key={key} style={styles.activityIside}>
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
  }

  const twoArraysForHomePage = () => {
    return [
      timeEntryListOnlyFive.map((activity, index) =>
        viewOfTimeEntries(activity, activity.timeEntryID, index, true)
      ),
      oldTimeEntriesForHomePage.map((activity, index) =>
        viewOfTimeEntries(activity, index, index, false)
      ),
    ];
  };

  function showTimeEntriesList() {
    return (
      <View style={styles.container}>
        <View
          style={{
            paddingHorizontal: 8,
            borderRadius: 2,
          }}
        >
          {(timeEntryListOnlyFive.length === 0 &&
            oldTimeEntriesForHomePage.length === 0 &&
            rout.name === "HomePage") ||
          (rout.name === "MyTimePage" &&
            timeEntryList.length === 0 &&
            timeEntriesTwoMonthsBefore.length === 0) ? (
            <Text style={{ ...typography.b2, marginLeft: 10 }}>
              Du har inte loggat någon tid ännu!
            </Text>
          ) : null}
          {rout.name === "HomePage" ? (
            twoArraysForHomePage()
          ) : (
            <View style={{ maxHeight: 550 }}>
              <FlatList
                data={[...timeEntryList, ...timeEntriesTwoMonthsBefore]}
                onEndReached={() => {
                  entryTime.setScrollToGetMoreTimeEntries(true);
                }}
                onEndReachedThreshold={0.05}
                keyExtractor={(item) => item.timeEntryID}
                renderItem={({ item, index }) =>
                  viewOfTimeEntries(
                    item,
                    item.timeEntryID,
                    index,
                    item.possibleToMakeChanges
                  )
                }
              />
            </View>
          )}
        </View>
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
      <View style={styles.containerForTitleAndDropDown(rout)}>
        <Text style={styles.title}>Mina aktiviteter</Text>
        <View>
          {rout.name === "MyTimePage" && (
            <DropDownForSorting
              choice={(selectedOptionForSorting) =>
                setSelectedOptionForSorting(selectedOptionForSorting)
              }
            />
          )}
        </View>
      </View>

      {showTimeEntriesList()}
      <Overlay
        isVisible={showErrorMessage}
        animationType="fade"
        overlayStyle={{ width: "92%", padding: 12, borderRadius: 5 }}
        onBackdropPress={() => setShowErrorMessage(false)}
      >
        <Text style={{ ...typography.b2 }}>
          Man kan inte ändra på tidsinmatningar äldre än två månader
        </Text>
      </Overlay>
    </View>
  );
}
export default MyTimeEntries;

const styles = StyleSheet.create({
  containerForTheWholeComponent: {
    marginBottom: 8,
    zIndex: 4,
  },
  container: {
    justifyContent: "flex-start",
    marginHorizontal: -16,
  },
  title: {
    flex: 1,
    ...typography.title,
    color: colors.dark,
  },
  containerForTitleAndDropDown: (route) => ({
    flexDirection: "row",
    marginTop: 16,
    paddingBottom: route.name === "MyTimePage" ? 16 : 0,
    zIndex: 1,
  }),
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
    paddingHorizontal: 8,
    marginHorizontal: 8,
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
});
