import {View, Text, TextInput} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  console.log('Login');
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      console.log('Navigation to Login');
    });
    const unsubscribeBlur = navigation.addListener('blur', () => {
      console.log('Bye bye');
    });

    // return () => unsubscribe();
    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation]);
  return (
    <View>
      <Text>Login</Text>
      <TextInput />
      <TextInput />
    </View>
  );
};

export default Login;
