import React,{ useEffect } from 'react';

import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PushNotification from 'react-native-push-notification';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Store,persistor } from './src/redux/store';

const RootStack = createNativeStackNavigator();
// Navigator Screens
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navigation from './src/Screens/Navigations/StackNavigation';

function App() {
  const generateFcmToken = async () => {
    const fcmtoken = await AsyncStorage.getItem('fcmToken');
   
    if (!fcmtoken) {
      try {
        const newfcmToken = messaging().getToken();
        await AsyncStorage.setItem('fcmToken', newfcmToken);
      } catch (error) {
        console.log(error, 'in generating fcm token error');
      }
    }
  };
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    console.log('=======', authStatus);
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    await messaging().requestPermission({
      sound: true,
      announcement: true,
      provisional: true,
      providesAppNotificationSettings: true,
      // ... other permission settings
    });
    if (enabled) {
      console.log('Authorization status:', authStatus);
      generateFcmToken();
    } else {
      console.log('Not AUTHORIZED');
    }
  };

  useEffect(() => {
    // requestUserPermission();
    PushNotification.createChannel({
      channelId: 'WorldAzanTime',
      channelName: 'World Azan Time',
    });
  }, []);

  // useEffect(() => {
  //   requestUserPermission();
  //   NotificationListner();
  // }, []);

  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <Foreground_Handler /> */}
        <SafeAreaProvider>
          <NavigationContainer>
            <RootStack.Navigator
              headerMode="none"
              screenOptions={{
                headerShown: false,
              }}
            >
              <RootStack.Screen name="Navigation" component={Navigation} />
            </RootStack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;


/* 


[FIRApp configure];
  bool didFinish=[super application:application didFinishLaunchingWithOptions:launchOptions]; // added 
  [RNSplashScreen show];  // here
  return didFinish; 
*/