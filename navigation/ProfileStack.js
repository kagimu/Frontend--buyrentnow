import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import ProfileScreen from '../components/ProfileScreen';
import EditProfile from '../components/EditProfile';
import MyLocations from '../components/MyLocations';
import BookScreen from '../components/BookScreen';
import MessageScreen from '../components/MessageScreen';
import Reviews from '../components/Reviews';
import MyProfile from '../components/MyProfile';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator initialRouteName="ProfileScreen"
            screenOptions={{ headerTransparent: true, title: '' }}
        >
            <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
            <Stack.Screen name='MyProfile' component={MyProfile} />
            <Stack.Screen name='Reviews' component={Reviews} />
            <Stack.Screen name='EditProfile' component={EditProfile} />
            <Stack.Screen name='MyLocations' component={MyLocations} />
            <Stack.Screen name='BookScreen' component={BookScreen} />
            <Stack.Screen name='MessageScreen' component={MessageScreen} />

        </Stack.Navigator>
    )
}
export default ProfileStack

const styles = StyleSheet.create({})