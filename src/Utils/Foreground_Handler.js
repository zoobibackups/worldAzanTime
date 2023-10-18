import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import PushNotification from 'react-native-push-notification';

const Foreground_Handler = () => {
  useEffect(() => {
    const unSubscribe = messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification
      );
      PushNotification.localNotification({
        channelId: 'channel-id',
        title: 'Android',
        body: 'Test body',
        soundName: 'default',
        vibrate: true,
        playSound: true,
      });
    });
    return unSubscribe;
  }, []);
};
export default Foreground_Handler;
