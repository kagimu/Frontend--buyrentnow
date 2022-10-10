import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import CategoryScreen from '../components/CategoryScreen';
import AddLocation from '../components/Location/AddLocation';
import HomeScreen from '../components/HomeScreen';
import LoginScreen from '../components/login/LoginScreen';
import SignupScreen from '../components/login/SignupScreen';


const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName="SignupScreen" screenOptions={screenOptions}>
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name='CategoryScreen' component={CategoryScreen} />
            <Stack.Screen name='AddLocation' component={AddLocation} />
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='SignupScreen' component={SignupScreen} />




        </Stack.Navigator>
    )
}

export default HomeStack

const styles = StyleSheet.create({})