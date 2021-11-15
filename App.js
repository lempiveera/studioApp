import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabView, SceneMap } from 'react-native-tab-view';


import Downstairs from './components/Downstairs';
import Upstairs from './components/Upstairs';
import Sumu from './components/Sumu';
import Map from './components/Map';

export default function App() {

  const Tab = createBottomTabNavigator();

//notifications are gonna be hard

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Upstairs" component={Upstairs} />
        <Tab.Screen name="Downstairs" component={Downstairs} />
        <Tab.Screen name="Sumu" component={Sumu} />
        <Tab.Screen name="Location" component={Map} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
