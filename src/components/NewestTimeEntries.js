import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import useTimeEntries from "../customFirebaseHooks/useTimeEntries";

import TimeEntry from "./TimeEntry";
import CalendarView from "./CalendarView";

import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";

const NewestTimeEntries = ({ navigation }) => {
  const { timeEntries, isLoading, error } = useTimeEntries(5);
  const [visible, setVisible] = useState(false);
  const [activity, setActivity] = useState({});

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <>
      <Text style={styles.title}>Mina aktiviteter</Text>
      {timeEntries.length === 0 && (
        <View style={{ backgroundColor: colors.background }}>
          <Text style={{ ...typography.b2, marginLeft: 10 }}>
            Du har inte loggat någon tid ännu!
          </Text>
        </View>
      )}
      {timeEntries.map((entry) => (
        <TimeEntry
          key={entry.id}
          entry={entry}
          setActivity={setActivity}
          toggleOverlay={toggleOverlay}
        />
      ))}
      <TouchableOpacity
        style={{ width: "50%", height: 55, marginTop: 12 }}
        testID="showAllButton"
        onPress={() => navigation.navigate("MyTimePage")}
      >
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.buttonBorderStyle}
        >
          <View style={styles.viewAll}>
            <Text style={styles.viewAllText}>Visa allt</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
      <CalendarView
        visible={visible}
        toggleVisibility={toggleOverlay}
        activity={activity}
        adminID={activity.adminID}
        isEditing={true}
      />
    </>
  );
};

export default NewestTimeEntries;

const styles = StyleSheet.create({
  title: {
    ...typography.title,
    color: colors.dark,
  },
  buttonBorderStyle: {
    borderRadius: 5,
    height: "100%",
    width: "100%",
    padding: 1,
  },
  viewAll: {
    letterSpacing: 1,
    backgroundColor: colors.light,
    width: "100%",
    height: "100%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  viewAllText: {
    ...typography.button.lg,
    fontWeight: "500",
    color: colors.dark,
  },
});
