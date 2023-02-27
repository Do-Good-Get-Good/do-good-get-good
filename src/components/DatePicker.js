import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Pressable,
} from 'react-native';

import {Overlay, Icon} from '@rneui/base';
import {Calendar} from 'react-native-calendars';

import {format} from 'date-fns';

import colors from '../assets/theme/colors';
import typography from '../assets/theme/typography';

const DatePicker = ({date, setDate}) => {
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [today, setToday] = useState(null);
  const [todaySelected, setTodaySelected] = useState(null);

  useEffect(() => {
    if (visible) {
      setToday(format(new Date(), 'yyyy-MM-dd'));
      setSelectedDate(format(new Date(date), 'yyyy-MM-dd'));
    } else {
      setToday(null);
      setSelectedDate(null);
    }
  }, [visible]);

  //Checks if the selected date is todays date
  //Updates every time the selectedDate value changes
  useEffect(() => {
    if (selectedDate === today) {
      setTodaySelected(selectedDate);
    } else {
      setTodaySelected(null);
    }
  }, [selectedDate]);

  return (
    <>
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setVisible(true)}>
        <View style={styles.buttonView}>
          <Text style={typography.b2}>{date}</Text>
        </View>
      </TouchableOpacity>
      <Overlay
        visible={visible}
        onBackdropPress={() => setVisible(!visible)}
        overlayStyle={styles.overlayStyle}>
        <Pressable
          style={{position: 'absolute', right: -10, top: -10, zIndex: 1}}
          onPress={() => setVisible(false)}>
          <Icon
            name="close"
            type="material"
            size={30}
            style={{backgroundColor: colors.background, borderRadius: 25}}
          />
        </Pressable>
        <Calendar
          onDayPress={day => {
            setSelectedDate(day.dateString);
          }}
          monthFormat={'MMMM yyyy'}
          firstDay={1}
          theme={{
            todayTextColor: colors.dark,
            textMonthFontSize: typography.b2.fontSize,
            textMonthFontFamily: typography.b2.fontFamily,
            monthTextColor: colors.dark,
            textMonthFontWeight: '400',
            dayTextColor: colors.dark,
            textDayFontFamily: typography.b2.fontFamily,
            arrowColor: colors.dark,
            textDisabledColor: '#33333360',
          }}
          markingType={'custom'}
          markedDates={{
            [today]: {
              customStyles: {
                container: {
                  backgroundColor: '#84BD0040',
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
                  backgroundColor: '#84BD0040',
                  borderWidth: 1,
                  borderColor: colors.primary,
                  borderRadius: 0,
                },
              },
            },
          }}
        />
        <TouchableOpacity
          style={styles.saveDateButton}
          onPress={() => {
            setDate(selectedDate);
            setVisible(false);
          }}>
          <View style={[styles.buttonView, {backgroundColor: colors.primary}]}>
            <Text style={{...typography.button.lg}}>Välj datum</Text>
          </View>
        </TouchableOpacity>
      </Overlay>
    </>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  overlayStyle: {
    width: '80%',
  },
  datePickerButton: {
    height: 50,
    width: 125,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowOffset: {
          height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  buttonView: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.background,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveDateButton: {
    marginTop: 16,
    height: 50,
    width: '100%',
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowOffset: {
          height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});
