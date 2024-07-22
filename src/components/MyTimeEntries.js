import React, { useState, useEffect, useCallback } from "react";
import { Text, StyleSheet, View, Platform, FlatList } from "react-native";
import CalendarView from "./CalendarView";
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";
import DropDownForSorting from "./DropDownForSorting";
import TimeEntry from "./TimeEntry";
import useTimeEntriesWithLimit from "../hooks/useTimeEntriesWithLimit";
import { getUserTimeEntriesOrderByDate } from "../firebase-functions/get";

import auth from "@react-native-firebase/auth";

function MyTimeEntries() {
  const { timeEntries, isLoading, error } = useTimeEntriesWithLimit(30);
  const [visible, setVisible] = useState(false);
  const [activity, setActivity] = useState([]);
  const [sortOption, setSortOption] = useState(null);
  const [data, setData] = useState([]);
  const [startPoint, setStartPoint] = useState(null);
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
          startPoint,
        );
        let entries = [...dataAfterScroll, ...data];
        setDataAfterScroll(entries);
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

  const removeFirstStaticTimeEntry = () => {
    setDataAfterScroll(dataAfterScroll.slice(1));
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
      {data.length > 0 ? (
        <FlatList
          style={{ flex: 1 }}
          data={data}
          onEndReached={() => loadMoreEntries()}
          onEndReachedThreshold={0.25}
          keyExtractor={(item) => item.timeEntryID}
          renderItem={({ item }) => (
            <TimeEntry
              key={item.timeEntryID}
              entry={item}
              setActivity={setActivity}
              toggleOverlay={toggleOverlay}
            />
          )}
        />
      ) : (
        <Text style={{ ...typography.b2 }}>
          Du har inte loggat någon tid ännu!
        </Text>
      )}
      <CalendarView
        visible={visible}
        toggleVisibility={toggleOverlay}
        activity={activity}
        adminID={activity.adminID}
        isEditing={true}
        removeFirstStaticTimeEntry={removeFirstStaticTimeEntry}
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
    marginHorizontal: 16,
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
});
