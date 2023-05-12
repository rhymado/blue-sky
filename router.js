import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from './Home';
import App from './App';
import Dashboard from './src/screens/Content/dashboard';
import Profile from './src/screens/Content/profile';
import Login from './src/screens/Auth/login';
import Register from './src/screens/Auth/register';

const AuthPage = () => {
  const {Navigator, Screen} = createBottomTabNavigator();
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="signin" component={Login} />
      <Screen name="signup" component={Register} />
    </Navigator>
  );
};

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator initialRouteName="dboard">
      <Drawer.Screen name="dboard" component={Dashboard} />
      <Drawer.Screen name="prof" component={Profile} />
      <Drawer.Screen name="auth" component={AuthPage} />
    </Drawer.Navigator>
  );
};

const StackNavigator = () => {
  const {Navigator, Screen} = createStackNavigator();
  return (
    <Navigator
      initialRouteName="Drawer"
      // screenOptions={{
      //   headerShown: false,
      // }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Screen name="App" component={App} />
      <Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Navigator>
  );
};

const Router = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default Router;
