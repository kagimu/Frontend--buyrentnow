import { StyleSheet, Text, View } from 'react-native';
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddLocation from '../components/Location/AddLocation';
import LocationCategory from '../components/Location/LocationCategory';
import Upload from '../components/Location/Upload';
import PhotoScreen from '../components/Location/PhotoScreen';
import LocationName from '../components/Location/LocationName';
import LocationPin from '../components/Location/LocationPin';
import Prices from '../components/Location/Prices';
import Confirm from '../components/Location/Confirm';

const Stack = createNativeStackNavigator();


const LocationStack = () => {

    return (
        <Stack.Navigator
            initialRouteName="AddLocation"
            screenOptions={{ headerShadowVisible: false }}
        >
            <Stack.Screen name='Become A Host' component={AddLocation} />
            <Stack.Screen name='LocationCategory' component={LocationCategory} />
            <Stack.Screen name='Upload' component={Upload} />
            <Stack.Screen name='Add Images' component={PhotoScreen} />
            <Stack.Screen name='LocationName' component={LocationName} />
            <Stack.Screen name='LocationPin' component={LocationPin} />
            <Stack.Screen name='Prices' component={Prices} />
            <Stack.Screen name='Confirm' component={Confirm} />



        </Stack.Navigator >
    )
}

export default LocationStack

const styles = StyleSheet.create({})