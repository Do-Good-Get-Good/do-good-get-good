/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { scheduleBackgroundNotifications } from './components/BackgroundTask';



AppRegistry.registerHeadlessTask('NotifeeHeadlessTask', () => async ({ type, detail }) => {
    switch (type) {
      case notifee.HeadlessEventTypes.NOTIFICATION_RECEIVED_BACKGROUND:
        console.log('Received background notification:', detail.notification);
        break;
      default:
        console.warn('Unhandled notifee headless event type', type);
    }
  });
  


AppRegistry.registerComponent(appName, () => App);
scheduleBackgroundNotifications();
