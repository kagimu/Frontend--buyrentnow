import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import CategoryScreen from '../components/CategoryScreen';
import HomeScreen from '../components/HomeScreen';
import LoginScreen from '../components/login/LoginScreen';
import BookingConfirmation from '../components/BookingConfirmation';
import PostDetails from '../components/PostDetails';
import AgentForm from '../components/AgentForm';


const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShadowVisible: false, headerTransparent: true, title: '' }}>
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name='CategoryScreen' component={CategoryScreen} />
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='PostDetails' component={PostDetails} />
            <Stack.Screen name='AgentForm' component={AgentForm} />
            <Stack.Screen name='BookingConfirmation' component={BookingConfirmation} />

        </Stack.Navigator >
    )
}

export default HomeStack

const styles = StyleSheet.create({})