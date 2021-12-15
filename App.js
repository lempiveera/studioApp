import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabView, SceneMap } from 'react-native-tab-view';

import { AntDesign, Entypo } from '@expo/vector-icons';

import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import Downstairs from './components/Downstairs';
import Upstairs from './components/Upstairs';
import Sumu from './components/Sumu';
import Map from './components/Map';

const MyTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#ff00fa',
  },
};

export default function App() {

  const Tab = createBottomTabNavigator();

  //notifications are gonna be hard

  return (
    // OKAY U ARE HERE TRYING
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator>
        <Tab.Screen name="Upstairs" component={Upstairs}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="arrowup" color={color} size={size} />
            ),
          }} />
        <Tab.Screen name="Downstairs" component={Downstairs}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="arrowdown" color={color} size={size} />
            ),
          }} />
        <Tab.Screen name="Sumu" component={Sumu}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Entypo name="cloud" color={color} size={size} />
            ),
          }} />
        <Tab.Screen name="Location" component={Map}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Entypo name="location-pin" color={color} size={size} />
            ),
          }} />
      </Tab.Navigator>
    </NavigationContainer>

  );
}

AppRegistry.registerComponent('app', () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
