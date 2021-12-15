import React from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import { AntDesign, Entypo } from '@expo/vector-icons';
import { AppRegistry } from 'react-native';

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

  return (
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
