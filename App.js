import React from 'react';
import {StyleSheet} from 'react-native';
import GetStarted from './src/screens/GetStarted';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="get-started">
        <Stack.Screen
          name="get-started"
          component={GetStarted}
          options={{
            headerShown: false,
          }}></Stack.Screen>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Chat',
          }}></Stack.Screen>
        <Stack.Screen
          name="userChat"
          component={ChatScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
