import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import CategoryScreen from '../components/CategoryScreen';
import CategoryDetails from '../components/CategoryDetails';
import BookingConfirmation from '../components/BookingConfirmation';
import Category from '../components/Category';



const Stack = createNativeStackNavigator();

const CategoryStack = () => {
    return (
        <Stack.Navigator initialRouteName="CategoryScreen"
            screenOptions={{ headerShadowVisible: false, headerTransparent: true, title: '' }}
        >
            <Stack.Screen name='Categories' component={CategoryScreen} />
            <Stack.Screen name='Category' component={Category} />
            <Stack.Screen name='CategoryDetails' component={CategoryDetails} />
            <Stack.Screen name='BookingConfirmation' component={BookingConfirmation} />

        </Stack.Navigator>
    )
}

export default CategoryStack

const styles = StyleSheet.create({})