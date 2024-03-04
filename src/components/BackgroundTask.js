import notifee  from '@notifee/react-native';
import { Platform } from 'react-native';

export const scheduleBackgroundNotifications = () => {

  const interval = 10* 60 * 1000;

  // const interval = 7 * 24 * 60 * 60 * 1000;

  // Schedule background task based on platform
  const scheduleTask = async () => {
    try {
      const currentDate = new Date();

      // Check if it's Monday and the current time is 11:25 AM
      // if (currentDate.getDay() === 2 && currentDate.getHours() === 9 && currentDate.getMinutes() === 0) {
      // Schedule background task for Tuesday at 9:00 AM
        if (Platform.OS === 'android') {
          // For Android
          await notifee.displayNotification({
            title: 'Background Notification',
            body: 'This is a background notification',
            android: {
              channelId: 'background-channel',
            },
          });
        } else if (Platform.OS === 'ios') {
          // For iOS, use Notifee's `displayNotification` method as well
          await notifee.displayNotification({
            title: 'Background Notification',
            body: 'This is a background notification',
            android: {
              channelId: 'background-channel',
            },
          });
        }
      // }
    } catch (error) {
      console.error('Error scheduling background task:', error);
    }
  };

  // Schedule the task initially
  // scheduleTask();

  // Set up periodic scheduling (every week)
  setInterval(scheduleTask, interval);
};