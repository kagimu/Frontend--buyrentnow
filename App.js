import React, { useState } from 'react';
import { LogBox, SafeAreaView, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './navigation/TabNavigator';
import 'react-native-gesture-handler';
import GlobalStyles from './GlobalStyles';
import LoginScreen from './components/login/LoginScreen';
import OnboardingScreen from './components/OnboardingScreen';


LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);

const Stack = createNativeStackNavigator();

export default function App() {



  return (

    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' >

          <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ header: () => null }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ header: () => null }} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ header: () => null }} />

        </Stack.Navigator>
      </NavigationContainer>

    </SafeAreaView>
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
