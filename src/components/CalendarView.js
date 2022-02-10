import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Overlay } from "react-native-elements";
import { Calendar } from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { format } from "date-fns";
import toDate from "date-fns/toDate";
import { ScrollView } from "react-native";
import { Platform } from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const CalendarView = ({ visible, toggleVisibility, activity, isEditing }) => {
  LocaleConfig.locales["sv"] = {
    monthNames: [
      "Januari",
      "Februari",
      "Mars",
      "April",
      "Maj",
      "Juni",
      "Juli",
      "Augusti",
      "September",
      "Oktober",
      "November",
      "December",
    ],
    monthNamesShort: [
      "Jan",
      "Feb",
      "Mars",
      "Apr",
      "Maj",
      "Juni",
      "Juli",
      "Aug",
      "Sept",
      "Okt",
      "Nov",
      "Dec",
    ],
    dayNames: [
      "Måndag",
      "Tisdag",
      "Onsdag",
      "Torsdag",
      "Fredag",
      "Lördag",
      "Söndag",
    ],
    dayNamesShort: ["S", "M", "T", "O", "T", "F", "L"],
    today: "Idag",
  };
  LocaleConfig.defaultLocale = "sv";

  const [date, setDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [hours, setHours] = useState(null);
  const [todaySelected, setTodaySelected] = useState(null);

  //If the calendar view (modal) is visible it gets the current date and selects it
  //If a user edits an activity the activity date gets selected and the activity time (in hours) is shown
  //If the calendar is not visible it sets all values to null
  //Updates every time the visible prop changes
  useEffect(() => {
    if (visible) {
      if (isEditing) {
        setDate(format(new Date(), "yyyy-MM-dd"));
        setSelectedDate(format(new Date(activity.date), "yyyy-MM-dd"));
        setHours(activity.time);
      } else {
        setDate(format(new Date(), "yyyy-MM-dd"));
        setSelectedDate(format(new Date(), "yyyy-MM-dd"));
        setHours(0);
      }
    } else if (!visible) {
      setDate(null);
      setSelectedDate(null);
      setHours(null);
    }
  }, [visible]);

  //Checks if the selected date is todays date
  //Updates every time the selectedDate value changes
  useEffect(() => {
    if (selectedDate === date) {
      setTodaySelected(selectedDate);
    } else {
      setTodaySelected(null);
    }
  }, [selectedDate]);

  //Registers a users activity (saving to Firebase Firestore)
  const registerTimeEntry = () => {
    let date = toDate(new Date(selectedDate));
    firestore()
      .collection("Users")
      .doc(auth().currentUser.uid)
      .collection("time_entries")
      .add({
        activity_id: activity.id,
        date: date,
        status_confirmed: false,
        time: hours,
      })
      .then(() => {
        console.log("New time entry added!");
      });
    toggleVisibility();
  };

  //Change activity date and time (hours) - (Saving to Firebase Firestore)
  const changeTimeEntry = () => {
    let date = toDate(new Date(selectedDate));
    firestore()
      .collection("Users")
      .doc(auth().currentUser.uid)
      .collection("time_entries")
      .doc(activity.timeEntryID)
      .set(
        {
          date: date,
          time: hours,
        },
        { merge: true }
      )
      .then(() => {
        console.log("Updated time entry!");
      });
    toggleVisibility();
  };

  //Removes a users time entry from the database (Firebase Firestore)
  const deleteTimeEntry = () => {
    firestore()
      .collection("Users")
      .doc(auth().currentUser.uid)
      .collection("time_entries")
      .doc(activity.timeEntryID)
      .delete()
      .then(() => {
        console.log("Removed time entry!");
      });
    toggleVisibility();
  };

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={toggleVisibility}
      overlayStyle={{
        backgroundColor: "#F5F5F5",
        borderRadius: 5,
        width: "90%",
        marginTop: 64,
        marginBottom: 55,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      animationType="fade"
    >
      <TouchableOpacity
        style={{ position: "absolute", right: -10, top: -10 }}
        onPress={toggleVisibility}
      >
        <Icon
          name="close"
          type="material"
          size={35}
          style={tw`bg-white rounded-full`}
        />
      </TouchableOpacity>
      <ScrollView
        style={{
          padding: 16,
        }}
      >
        <Text 
          testID="calendarView.headerText" 
          style={styles.activityTitle}
        >
          {isEditing ? activity.title : activity.title + " - " + activity.city}
        </Text>
        <Text style={styles.chooseDateText}>Välj datum</Text>
        <View style={styles.calendarAndHourView}>
          <Calendar
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
            }}
            monthFormat={"MMMM yyyy"}
            // Hide month navigation arrows. Default = false
            hideArrows={true}
            disableMonthChange={true}
            // If firstDay = 1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
            firstDay={1}
            disableAllTouchEventsForDisabledDays={true}
            // Specify theme properties to override specific styles for calendar parts. Default = {}
            theme={{
              todayTextColor: "#000000",
            }}
            markingType={"custom"}
            markedDates={{
              [date]: {
                customStyles: {
                  container: {
                    backgroundColor: "#84BD0040",
                    borderRadius: 0,
                  },
                },
              },
              [selectedDate]: {
                customStyles: {
                  container: {
                    borderWidth: 1,
                    borderColor: "#84BD00",
                    borderRadius: 0,
                  },
                },
              },
              [todaySelected]: {
                customStyles: {
                  container: {
                    backgroundColor: "#84BD0040",
                    borderWidth: 1,
                    borderColor: "#84BD00",
                    borderRadius: 0,
                  },
                },
              },
            }}
          />
          <Text style={styles.questionText}>Hur lång aktivitet?</Text>
          <View style={styles.hourAmountView}>
            <TouchableOpacity
              style={styles.hourButton}
              onPress={() => {
                if (hours === 0) {
                  return;
                }
                setHours(hours - 0.5);
              }}
            >
              <Text style={styles.hourAmountText}>-</Text>
            </TouchableOpacity>
            <View style={styles.hourAmount}>
              <Text testID="calendarView.hourInput" style={styles.hourAmountText}>{hours}</Text>
            </View>
            <TouchableOpacity
              style={styles.hourButton}
              onPress={() => setHours(hours + 0.5)}
            >
              <Text style={styles.hourAmountText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text testID="calendarView.dateAndHourInput" style={styles.dateAndHourSummary}>
          {format(new Date(selectedDate), "eee d LLLL") + `, ${hours}h`}
        </Text>
      </ScrollView>

      {!isEditing ? (
        <TouchableOpacity
          style={styles.sendBtn}
          onPress={() => {
            registerTimeEntry();
          }}
        >
          <Text style={styles.sendBtnText}>Logga tid</Text>
        </TouchableOpacity>
      ) : null}

      {isEditing ? (
        <>
          <TouchableOpacity
            style={[styles.sendBtn, styles.changeBtn]}
            onPress={() => {
              changeTimeEntry();
            }}
          >
            <Text style={styles.sendBtnText}>Ändra tid</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sendBtn, styles.deleteBtn]}
            onPress={() => {
              deleteTimeEntry();
            }}
          >
            <Text style={styles.sendBtnText}>Ta bort tid</Text>
          </TouchableOpacity>
        </>
      ) : null}
    </Overlay>
  );
};

export default CalendarView;

const styles = StyleSheet.create({
  activityTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  chooseDateText: {
    fontSize: 18,
    marginBottom: 12,
  },
  calendarAndHourView: {
    marginLeft: 8,
    marginRight: 8,
  },
  questionText: {
    fontSize: 18,
    marginTop: 20,
    marginLeft: -8,
  },
  hourAmountView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 46,
    marginTop: 16,
    marginBottom: 16,
  },
  hourAmount: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginLeft: 10,
  },
  hourAmountText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  hourButton: {
    width: 46,
    height: 46,
    padding: 0,
    margin: 0,
    backgroundColor: "#84BD00",
    justifyContent: "center",
    alignItems: "center",
  },
  dateAndHourSummary: {
    fontSize: 18,
  },
  sendBtn: {
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#84BD00",
    marginLeft: -10,
    marginRight: -10,
    marginBottom: -10,
    ...Platform.select({
      ios: {
        marginBottom: -11,
      },
    }),
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  sendBtnText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  changeBtn: {
    marginBottom: 10,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  deleteBtn: {
    marginTop: -10,
    backgroundColor: "#F5F5F5",
  },
});
