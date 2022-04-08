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
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";

const CalendarView = ({
  visible,
  toggleVisibility,
  activity,
  isEditing,
  adminID,
}) => {
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

  const addTotalHoursMonth = (hours) => {
    try {
      firestore()
        .collection("Users")
        .doc(auth().currentUser.uid)
        .update({
          total_hours_month: firestore.FieldValue.increment(hours),
        })
        .catch((error) => {
          console.log("errorMessage ", error);
        });
    } catch (error) {
      console.log("errorMessage ", error);
    }
  };
  const removeTotalHoursMonth = (hours) => {
    try {
      firestore()
        .collection("Users")
        .doc(auth().currentUser.uid)
        .update({
          total_hours_month: firestore.FieldValue.increment(-hours),
        })
        .catch((error) => {
          console.log("errorMessage ", error);
        });
    } catch (error) {
      console.log("errorMessage ", error);
    }
  };

  //Registers a users activity (saving to Firebase Firestore)
  const registerTimeEntry = () => {
    let date = toDate(new Date(selectedDate));
    firestore().collection("timeentries").add({
      activity_id: activity.id,
      user_id: auth().currentUser.uid,
      date: date,
      status_confirmed: false,
      time: hours,
      admin_id: adminID,
      activity_title: activity.title,
    });
    addTotalHoursMonth(hours);
    toggleVisibility();
  };

  //Change activity date and time (hours) - (Saving to Firebase Firestore)
  const changeTimeEntry = () => {
    let today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth();
    let date = toDate(new Date(selectedDate));
    firestore().collection("timeentries").doc(activity.timeEntryID).set(
      {
        date: date,
        time: hours,
      },
      { merge: true }
    );
    if (
      currentMonth === new Date(selectedDate).getMonth() &&
      currentYear === new Date(selectedDate).getFullYear()
    ) {
      if (activity.time < hours) {
        let newTime = hours - activity.time;
        addTotalHoursMonth(newTime);
      } else if (activity.time > hours) {
        let newTime = activity.time - hours;
        removeTotalHoursMonth(newTime);
      }
    }

    toggleVisibility();
  };

  //Removes a users time entry from the database (Firebase Firestore)
  const deleteTimeEntry = () => {
    firestore().collection("timeentries").doc(activity.timeEntryID).delete();
    removeTotalHoursMonth(hours);
    toggleVisibility();
  };

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={toggleVisibility}
      overlayStyle={{
        backgroundColor: colors.light,
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
        <Text testID="calendarView.headerText" style={styles.activityTitle}>
          {isEditing ? activity.title : activity.title + " - " + activity.city}
        </Text>
        <Text style={styles.chooseDateText}>Välj datum</Text>
        <View style={styles.calendarAndHourView}>
          <Calendar
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
            }}
            monthFormat={"MMMM yyyy"}
            hideArrows={true}
            disableMonthChange={true}
            firstDay={1}
            disableAllTouchEventsForDisabledDays={true}
            theme={{
              todayTextColor: colors.dark,
              textMonthFontSize: typography.b2.fontSize,
              textMonthFontFamily: typography.b2.fontFamily,
              monthTextColor: colors.dark,
              textMonthFontWeight: "400",
              dayTextColor: colors.dark,
              textDayFontFamily: typography.b2.fontFamily,
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
                    borderColor: colors.primary,
                    borderRadius: 0,
                  },
                },
              },
              [todaySelected]: {
                customStyles: {
                  container: {
                    backgroundColor: "#84BD0040",
                    borderWidth: 1,
                    borderColor: colors.primary,
                    borderRadius: 0,
                  },
                },
              },
            }}
          />
          <Text style={styles.questionText}>Hur lång aktivitet?</Text>
          <View style={styles.hourAmountView}>
            <TouchableOpacity
              style={[
                styles.hourButton,
                hours === 0 && { backgroundColor: colors.disabled },
              ]}
              disabled={hours === 0}
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
              <Text
                testID="calendarView.hourInput"
                style={styles.hourAmountText}
              >
                {hours}
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.hourButton,
                hours === 24 && { backgroundColor: colors.disabled },
              ]}
              disabled={hours === 24}
              onPress={() => {
                if (hours === 24) {
                  return;
                }
                setHours(hours + 0.5);
              }}
            >
              <Text style={styles.hourAmountText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text
          testID="calendarView.dateAndHourInput"
          style={styles.dateAndHourSummary}
        >
          {format(new Date(selectedDate), "eee d LLLL") + `, ${hours}h`}
        </Text>
      </ScrollView>

      {!isEditing ? (
        <TouchableOpacity
          style={[
            styles.sendBtn,
            hours === 0 && { backgroundColor: colors.disabled },
          ]}
          onPress={() => {
            registerTimeEntry();
          }}
          disabled={hours === 0 ? true : false}
        >
          <Text style={styles.sendBtnText}>Logga tid</Text>
        </TouchableOpacity>
      ) : null}

      {isEditing ? (
        <>
          <TouchableOpacity
            style={[
              styles.sendBtn,
              styles.changeBtn,
              hours === 0 && { backgroundColor: colors.disabled },
            ]}
            onPress={() => {
              changeTimeEntry();
            }}
            disabled={hours === 0 ? true : false}
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
    ...typography.b1,
    fontWeight: "700",
  },
  chooseDateText: {
    ...typography.b1,
    fontWeight: "400",
    marginBottom: 9,
  },
  calendarAndHourView: {
    marginLeft: 8,
    marginRight: 8,
  },
  questionText: {
    ...typography.b1,
    marginTop: 20,
    marginLeft: -8,
  },
  hourAmountView: {
    flexDirection: "row",
    marginTop: 16,
    marginBottom: 16,
    alignContent: "center",
    height: 50,
  },
  hourAmount: {
    backgroundColor: colors.background,
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  hourAmountText: {
    ...typography.h2,
    color: colors.dark,
  },
  hourButton: {
    width: 50,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  dateAndHourSummary: {
    ...typography.b1,
  },
  sendBtn: {
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
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
    ...typography.button.lg,
    fontWeight: "500",
    color: colors.dark,
  },
  changeBtn: {
    marginBottom: 10,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  deleteBtn: {
    marginTop: -10,
    backgroundColor: colors.light,
  },
});
