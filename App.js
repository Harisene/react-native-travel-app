import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { NavigationContainer } from '@react-navigation/native';
import Detail from './src/screens/Detail';
import Home from './src/screens/Home';
enableScreens();

const Stack = createSharedElementStackNavigator();

export default function App() { 
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none" initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={() => ({
              gestureEnabled: false,
              transitionSpec: {
                open: { animation: 'timing', config: { duration: 600 } },
                close: { animation: 'timing', config: { duration: 600 } },
              },
              cardStyleInterpolator: ({ current: { progress } }) => {
                return {
                  cardStyle: {
                    opacity: progress,
                  },
                };
              },
            })}
          />
        </Stack.Navigator>
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
