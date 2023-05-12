import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Dashboard = () => {
  const navigation = useNavigation();
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
    </View>
  );
};

export default Dashboard;
