/**
 * @format
 */

import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { AppRegistry, Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';

PushNotification.configure({
  onNotification: function (notification) {
    console.log('notification', notification);
  },
  requestPermissions: Platform.OS === 'ios',
});

// messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//   console.log('Message handled in the background!', remoteMessage);
// });

AppRegistry.registerComponent(appName, () => App);
