import { Text } from '@rneui/base';
import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
 import notifee, { TimestampTrigger, TriggerType }  from '@notifee/react-native';

export const MonthlyAlert= () => {


  async function onCreateTriggerNotification() {
    await notifee.requestPermission()
    const date = new Date(Date.now());
    date.setHours(15);
    date.setMinutes(38);
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
    };
    await notifee.createTriggerNotification(
      { id:"1",
        title: "Greetings",
        body: "Have a nice day!",
        android: {
          channelId: "your-channel-id",
        },
      },
      trigger
    );
  }


  return (
    <View>
      <Text>Test For Notification</Text>
      <Button title="Display Notification" onPress={() => onCreateTriggerNotification()} />
    </View>
  );


  
  };
  