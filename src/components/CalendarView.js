import React, {useEffect, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  ScrollView,
} from 'react-native';

import {Overlay, Icon} from '@rneui/base';

import {Calendar, LocaleConfig} from 'react-native-calendars';

import {format} from 'date-fns';
import toDate from 'date-fns/toDate';
import {sv} from 'date-fns/locale';

import auth from '@react-native-firebase/auth';

import typography from '../assets/theme/typography';
import colors from '../assets/theme/colors';
import errorMessage from '../assets/recyclingStyles/errorMessage';

import {deleteTimeEntry} from '../firebase-functions/delete';
import {addTimeEntry} from '../firebase-functions/add';
import {
  incrementTotalHoursMonthForUser,
  decrementTotalHoursMonthForUser,
  updateTimeEntry,
} from '../firebase-functions/update';

const CalendarView = ({
  visible,
  toggleVisibility,
  activity,
  isEditing,
  adminID,
  removeFirstStaticTimeEntry,
}) => {
  LocaleConfig.locales['sv'] = {
    monthNames: [
      'Januari',
      'Februari',
      'Mars',
      'April',
      'Maj',
      'Juni',
      'Juli',
      'Augusti',
      'September',
      'Oktober',
      'November',
      'December',
    ],
    monthNamesShort: [
      'Jan',
      'Feb',
      'Mars',
      'Apr',
      'Maj',
      'Juni',
      'Juli',
      'Aug',
      'Sept',
      'Okt',
      'Nov',
      'Dec',
    ],
    dayNames: [
      'Måndag',
      'Tisdag',
      'Onsdag',
      'Torsdag',
      'Fredag',
      'Lördag',
      'Söndag',
    ],
    dayNamesShort: ['S', 'M', 'T', 'O', 'T', 'F', 'L'],
    today: 'Idag',
  };
  LocaleConfig.defaultLocale = 'sv';

  const [date, setDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [hours, setHours] = useState(null);
  const [todaySelected, setTodaySelected] = useState(null);
  const [error, setError] = useState(null);

  const uid = auth().currentUser.uid;

  //If the calendar view (modal) is visible it gets the current date and selects it
  //If a user edits an activity the activity date gets selected and the activity time (in hours) is shown
  //If the calendar is not visible it sets all values to null
  //Updates every time the visible prop changes
  useEffect(() => {
    if (visible) {
      if (isEditing) {
        setDate(format(new Date(), 'yyyy-MM-dd'));
        setSelectedDate(format(new Date(activity.date), 'yyyy-MM-dd'));
        setHours(activity.time);
      } else {
        setDate(format(new Date(), 'yyyy-MM-dd'));
        setSelectedDate(format(new Date(), 'yyyy-MM-dd'));
        setHours(0);
      }
    } else if (!visible) {
      setDate(null);
      setSelectedDate(null);
      setHours(null);
      setError(null);
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

  //Registers a users activity
  const registerTimeEntry = () => {
    let date = toDate(new Date(selectedDate));
    let timeEntry = {
      activity_id: activity.id,
      user_id: uid,
      date: date,
      status_confirmed: false,
      time: hours,
      admin_id: adminID,
      activity_title: activity.title,
    };

    addTimeEntry(timeEntry)
      .then(() => {
        incrementTotalHoursMonthForUser(uid, hours);
        toggleVisibility();
      })
      .catch(error => {
        console.log(error.message);
        setError('Ett fel uppstod, vänligen försök igen.');
        setTimeout(() => {
          setError(null);
        }, 3500);
      });
  };

  //Change activity date and time (hours)
  const changeTimeEntry = timeEntryID => {
    let today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth();
    let date = toDate(new Date(selectedDate));

    updateTimeEntry(timeEntryID, date, hours)
      .then(() => {
        if (
          currentMonth === new Date(selectedDate).getMonth() &&
          currentYear === new Date(selectedDate).getFullYear()
        ) {
          if (activity.time < hours) {
            let newTime = hours - activity.time;
            incrementTotalHoursMonthForUser(uid, newTime);
          } else if (activity.time > hours) {
            let newTime = activity.time - hours;
            decrementTotalHoursMonthForUser(uid, newTime);
          }
        }
        toggleVisibility();
      })
      .catch(error => {
        setError(error);
      });
  };

  //Removes a users time entry from the database
  const removeTimeEntry = timeEntryID => {
    if (removeFirstStaticTimeEntry !== undefined)
      removeFirstStaticTimeEntry(timeEntryID);

    deleteTimeEntry(timeEntryID)
      .then(() => {
        decrementTotalHoursMonthForUser(uid, hours);
        toggleVisibility();
      })
      .catch(error => {
        console.log(error);
        setError(error.message);
      });
  };

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={toggleVisibility}
      overlayStyle={{
        backgroundColor: colors.light,
        borderRadius: 5,
        paddingTop: 14,
        paddingHorizontal: 0,
        width: '90%',
        maxHeight: '85%',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      animationType="fade">
      <Pressable
        style={{position: 'absolute', right: -10, top: -10, zIndex: 2}}
        onPress={toggleVisibility}>
        <Icon
          name="close"
          type="material"
          size={35}
          style={{backgroundColor: colors.background, borderRadius: 25}}
        />
      </Pressable>
      <View style={{paddingHorizontal: 16}}>
        <Text testID="calendarView.headerText" style={styles.activityTitle}>
          {isEditing ? activity.title : activity.title + ' - ' + activity.city}
        </Text>
        <Text style={styles.chooseDateText}>Välj datum</Text>
      </View>
      <ScrollView
        style={{
          paddingHorizontal: 16,
        }}>
        <View style={styles.calendarAndHourView}>
          <Calendar
            onDayPress={day => {
              setSelectedDate(day.dateString);
            }}
            monthFormat={'MMMM yyyy'}
            hideArrows={true}
            disableMonthChange={true}
            firstDay={1}
            disableAllTouchEventsForDisabledDays={true}
            theme={{
              todayTextColor: colors.dark,
              textMonthFontSize: typography.b2.fontSize,
              textMonthFontFamily: typography.b2.fontFamily,
              monthTextColor: colors.dark,
              textMonthFontWeight: '400',
              dayTextColor: colors.dark,
              textDayFontFamily: typography.b2.fontFamily,
            }}
            markingType={'custom'}
            markedDates={{
              [date]: {
                customStyles: {
                  container: {
                    backgroundColor: `${colors.primary}40`,
                    borderRadius: 0,
                  },
                  text: {
                    color: colors.dark,
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
                  text: {
                    color: colors.dark,
                  },
                },
              },
              [todaySelected]: {
                customStyles: {
                  container: {
                    backgroundColor: `${colors.primary}40`,
                    borderWidth: 1,
                    borderColor: colors.primary,
                    borderRadius: 0,
                  },
                  text: {
                    color: colors.dark,
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
                hours === 0 && {backgroundColor: colors.disabled},
              ]}
              disabled={hours === 0}
              onPress={() => {
                if (hours === 0) {
                  return;
                }
                setHours(hours - 0.5);
              }}>
              <Text style={styles.hourAmountText}>-</Text>
            </TouchableOpacity>
            <View style={styles.hourAmount}>
              <Text
                testID="calendarView.hourInput"
                style={styles.hourAmountText}>
                {hours}
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.hourButton,
                hours === 24 && {backgroundColor: colors.disabled},
              ]}
              disabled={hours === 24}
              onPress={() => {
                if (hours === 24) {
                  return;
                }
                setHours(hours + 0.5);
              }}>
              <Text style={styles.hourAmountText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text
          testID="calendarView.dateAndHourInput"
          style={styles.dateAndHourSummary}>
          {format(new Date(selectedDate), 'EEE d LLLL', {locale: sv}) +
            `, ${hours}h`}
        </Text>
      </ScrollView>

      {error != null && (
        <Text
          testID="errorTextId"
          style={{alignSelf: 'center', marginBottom: 5, ...errorMessage}}>
          {error}
        </Text>
      )}

      {!isEditing && (
        <TouchableOpacity
          style={[
            styles.sendBtn,
            hours === 0 && {backgroundColor: colors.disabled},
          ]}
          onPress={() => {
            registerTimeEntry();
          }}
          disabled={hours === 0 ? true : false}>
          <Text style={styles.sendBtnText}>Logga tid</Text>
        </TouchableOpacity>
      )}

      {isEditing && (
        <>
          <TouchableOpacity
            style={[
              styles.sendBtn,
              styles.changeBtn,
              hours === 0 && {backgroundColor: colors.disabled},
            ]}
            onPress={() => {
              changeTimeEntry(activity.timeEntryID);
            }}
            disabled={hours === 0 ? true : false}>
            <Text style={styles.sendBtnText}>Ändra tid</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sendBtn, styles.deleteBtn]}
            onPress={() => {
              removeTimeEntry(activity.timeEntryID);
            }}>
            <Text style={styles.sendBtnText}>Ta bort tid</Text>
          </TouchableOpacity>
        </>
      )}
    </Overlay>
  );
};

export default CalendarView;

const styles = StyleSheet.create({
  activityTitle: {
    fontSize: typography.b1.fontSize,
    fontFamily: typography.b1.fontFamily,
    fontWeight: '700',
  },
  chooseDateText: {
    ...typography.b1,
    fontWeight: '400',
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
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 16,
    alignContent: 'center',
    height: 50,
  },
  hourAmount: {
    backgroundColor: colors.background,
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hourAmountText: {
    ...typography.h2,
    color: colors.dark,
  },
  hourButton: {
    width: 50,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateAndHourSummary: {
    ...typography.b1,
    paddingBottom: 16,
  },
  sendBtn: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
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
    fontWeight: '500',
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
