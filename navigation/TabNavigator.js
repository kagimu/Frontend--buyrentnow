import React from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabBar from '../components/TabBar'
import ProfileStack from '../navigation/ProfileStack'
import BookingConfirmation from '../components/BookingConfirmation'
import SavedPage from '../components/SavedPage'
import HomeStack from './HomeStack'



const Tab = createBottomTabNavigator();


const TabNavigator = () => {
    return (
        <Tab.Navigator tabBar={props => <TabBar {...props} />}
            screenOptions={{ headerTransparent: true, title: '' }}
            initialRouteName="Home"
        >
            <Tab.Screen name='ProfileStack' component={ProfileStack} initialParams={{ icon: 'user' }} />
            <Tab.Screen name='Home' component={HomeStack} initialParams={{ icon: 'home' }} />
            <Tab.Screen name='CategoryStack' component={BookingConfirmation} initialParams={{ icon: 'plus-circle' }} />
            <Tab.Screen name='Book' component={SavedPage} initialParams={{ icon: 'heart' }} />

        </Tab.Navigator>
    );
};

export default TabNavigator;

const styles = StyleSheet.create({})