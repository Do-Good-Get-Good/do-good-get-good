import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {Icon} from '@rneui/base';

import {format} from 'date-fns';

import colors from '../assets/theme/colors';
import typography from '../assets/theme/typography';

const TimeEntry = ({entry, setActivity, toggleOverlay}) => {
  const isTimeEntryTwoMonthsOld = () => {
    const now = new Date();

    const sixtyDaysInMs = 60 * 24 * 60 * 60 * 1000;

    const timeDiffInMs = now.getTime() - entry.date.getTime();

    if (timeDiffInMs >= sixtyDaysInMs) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <View style={styles.entryIside}>
      <Text
        style={{
          fontWeight:
            !entry.statusConfirmed && !isTimeEntryTwoMonthsOld()
              ? 'bold'
              : 'normal',
          color:
            !entry.statusConfirmed && !isTimeEntryTwoMonthsOld()
              ? colors.dark
              : colors.secondary,
          flex: 1,
          ...typography.b2,
        }}>
        {entry.title}
      </Text>
      <Text
        style={{
          color:
            !entry.statusConfirmed && !isTimeEntryTwoMonthsOld()
              ? colors.dark
              : colors.secondary,
          flex: 1,
          ...typography.b2,
          textAlign: 'center',
        }}>
        {format(entry.date, 'yyyy-MM-dd')}
      </Text>
      <Text
        style={{
          color:
            !entry.statusConfirmed && !isTimeEntryTwoMonthsOld()
              ? colors.dark
              : colors.secondary,
          flex: 0.6,
          ...typography.b2,
          textAlign: 'center',
          paddingRight: 5,
        }}>
        {entry.time} tim
      </Text>
      {!entry.statusConfirmed ? (
        <TouchableOpacity
          disabled={isTimeEntryTwoMonthsOld()}
          testID="editButton"
          onPress={() => {
            setActivity(entry);
            toggleOverlay();
          }}>
          <Icon
            testID="icon"
            color={isTimeEntryTwoMonthsOld() ? colors.secondary : colors.dark}
            name="pencil-outline"
            type="material-community"
            size={25}
          />
        </TouchableOpacity>
      ) : (
        <View testID="doneIcon">
          <Icon color={colors.secondary} name={'done'} size={25} />
        </View>
      )}
    </View>
  );
};

export default TimeEntry;

const styles = StyleSheet.create({
  entryIside: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    alignItems: 'center',
    paddingVertical: 2.5,
    paddingHorizontal: 8,
  },
});
