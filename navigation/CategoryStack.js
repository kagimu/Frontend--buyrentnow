import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import CategoryScreen from '../components/CategoryScreen';
import CategoryDetails from '../components/CategoryDetails';
import PaymentDetails from '../components/PaymentDetails';
import RatingAndComments from '../components/RatingAndComments';
import BookingConfirmation from '../components/BookingConfirmation';
import LocationDetails from '../components/LocationDetails';


const Stack = createNativeStackNavigator();

const CategoryStack = () => {
    return (
        <Stack.Navigator initialRouteName="CategoryScreen"
            screenOptions={{ headerShadowVisible: false }}
        >
            <Stack.Screen name='CategoryScreen' component={CategoryScreen} />
            <Stack.Screen name='CategoryDetails' component={CategoryDetails} />
            <Stack.Screen name='LocationDetails' component={LocationDetails} />
            <Stack.Screen name='PaymentDetails' component={PaymentDetails} />
            <Stack.Screen name='BookingConfirmation' component={BookingConfirmation} />
            <Stack.Screen name='RatingAndComments' component={RatingAndComments} />
        </Stack.Navigator>
    )
}

export default CategoryStack

const styles = StyleSheet.create({})