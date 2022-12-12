import React, { useState, useEffect, useCallback } from "react";
import { Text, StyleSheet, View, Platform, FlatList } from "react-native";
import CalendarView from "./CalendarView";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";
import DropDownForSorting from "./DropDownForSorting";
import TimeEntry from "./TimeEntry";
import useTimeEntriesWithLimit from "../customFirebaseHooks/useTimeEntriesWithLimit";
import { getUserTimeEntriesOrderByDate } from "../customFirebaseHooks/getFunctions";

import auth from "@react-native-firebase/auth";

function MyTimeEntries() {
  const { timeEntries, isLoading, error } = useTimeEntriesWithLimit(20);
  const [visible, setVisible] = useState(false);
  const [activity, setActivity] = useState([]);
  const [sortOption, setSortOption] = useState(null);
  const [data, setData] = useState([]);
  const [startPoint, setStartPoint] = useState(timeEntries.length);
  const [loadMore, setLoadMore] = useState(true);
  const [dataAfterScroll, setDataAfterScroll] = useState([]);

  useEffect(() => {
    if (timeEntries.length !== 0) {
      if (dataAfterScroll.length === 0)
        setStartPoint(timeEntries[timeEntries.length - 1].date);
    }
    return () => {
      setData([]);
      setStartPoint({});
    };
  }, [timeEntries]);

  useEffect(() => {
    switch (sortOption) {
      case "Godkända": {
        showTimeEntriesByStatus(true);
        break;
      }
      case "Inte godkända": {
        showTimeEntriesByStatus(false);
        break;
      }
      default: {
        showAllTimeEntries();
        break;
      }
    }
  }, [timeEntries, dataAfterScroll, sortOption]);

  const loadMoreEntries = async () => {
    if (loadMore) {
      try {
        let data = await getUserTimeEntriesOrderByDate(
          auth().currentUser.uid,
          startPoint
        );
        setDataAfterScroll(data);
        setStartPoint(data[data.length - 1].date);
      } catch (error) {
        console.log(error);
        setLoadMore(false);
      }
    }
  };

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const showAllTimeEntries = () => {
    setData([...timeEntries, ...dataAfterScroll]);
  };

  const showTimeEntriesByStatus = (status) => {
    const newArr = [...timeEntries, ...dataAfterScroll].filter((d) => {
      if (d.statusConfirmed === status) {
        return { ...d };
      }
    });
    setData(newArr);
  };

  return (
    <View style={styles.containerForTheWholeComponent}>
      <View style={styles.containerForTitleAndDropDown}>
        <Text style={styles.title}>Mina aktiviteter</Text>
        <DropDownForSorting
          choice={(sortOption) => {
            setSortOption(sortOption);
          }}
        />
      </View>

      {data.length === 0 && (
        <Text style={{ ...typography.b2 }}>
          Du har inte loggat någon tid ännu!
        </Text>
      )}
      {data.length !== 0 && (
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ height: "100%" }}
            data={data}
            onEndReached={() => loadMoreEntries()}
            onEndReachedThreshold={0.1}
            keyExtractor={(item) => item.timeEntryID}
            renderItem={({ item }) => (
              <TimeEntry
                entry={item}
                setActivity={setActivity}
                toggleOverlay={toggleOverlay}
              />
            )}
          />
        </View>
      )}
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
export default MyTimeEntries;

const styles = StyleSheet.create({
  containerForTheWholeComponent: {
    flex: 1,
    marginBottom: 8,
    zIndex: 4,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    marginHorizontal: -16,
  },
  title: {
    flex: 1,
    ...typography.title,
    color: colors.dark,
  },
  containerForTitleAndDropDown: {
    flexDirection: "row",
    marginTop: 16,
    paddingBottom: 16,
    zIndex: 1,
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
