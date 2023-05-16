import {View, Text, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import notifee, {AndroidImportance} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';

const Dashboard = () => {
  const navigation = useNavigation();
  const [token, setToken] = useState('');
  const onSendNotification = async (title = 'judul', body = 'konten') => {
    // console.log(title, body);
    try {
      // permission (IOS)
      await notifee.requestPermission();

      // create channel
      await notifee.createChannel({
        id: 'normal',
        name: 'Normal Notification',
        sound: 'default',
      });
      await notifee.createChannel({
        id: 'urgent',
        name: 'high_priority',
        sound: 'default',
        importance: AndroidImportance.HIGH,
      });
      // console.log(normalChannelId);
      // console.log(await notifee.getChannels());

      // display notification
      await notifee.displayNotification({
        android: {
          channelId: 'urgent',
        },
        title,
        subtitle: 'subjudul',
        body,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const onCreateFCMToken = async () => {
    try {
      // register device
      if (!messaging().isDeviceRegisteredForRemoteMessages)
        await messaging().registerDeviceForRemoteMessages();

      // register token
      const token = await messaging().getToken();
      setToken(token);
      console.log('FCM TOKEN ==>', token);
    } catch (err) {
      console.log(err);
    }
  };
  const getNotificationFromAPI = async () => {
    const baseUrl = 'http://192.168.100.17:8080';
    await axios
      .post(`${baseUrl}/notification`, {token})
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    const onMessageReceived = async remoteMessage => {
      // console.log('FCM Payload ==>', remoteMessage);
      const {title, body} = remoteMessage.notification;
      onSendNotification(title, body);
    };
    messaging().onMessage(onMessageReceived);
    messaging().setBackgroundMessageHandler(onMessageReceived);
  }, []);
  return (
    <View>
      <Text>Dashboard</Text>
      <Pressable
        onPress={() => navigation.navigate('Home')}
        style={{
          padding: 5,
          borderWidth: 2,
          borderColor: 'black',
          borderRadius: 5,
          margin: 5,
          alignItems: 'center',
        }}>
        <Text>Go to Home</Text>
      </Pressable>
      <Pressable
        onPress={() => onSendNotification()}
        style={{
          padding: 5,
          borderWidth: 2,
          borderColor: 'black',
          borderRadius: 5,
          margin: 5,
          alignItems: 'center',
          backgroundColor: 'black',
        }}>
        <Text style={{color: 'white'}}>Trigger Notification</Text>
      </Pressable>
      <Pressable
        onPress={onCreateFCMToken}
        style={{
          padding: 5,
          borderWidth: 2,
          borderColor: 'black',
          borderRadius: 5,
          margin: 5,
          alignItems: 'center',
        }}>
        <Text>Register to FCM</Text>
      </Pressable>
      <Pressable
        onPress={() => getNotificationFromAPI()}
        style={{
          padding: 5,
          borderWidth: 2,
          borderColor: 'black',
          borderRadius: 5,
          margin: 5,
          alignItems: 'center',
          backgroundColor: 'black',
        }}>
        <Text style={{color: 'white'}}>Trigger Notification From Server</Text>
      </Pressable>
    </View>
  );
};

export default Dashboard;
