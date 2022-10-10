import React from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../components/HomeScreen'
import BookScreen from '../components/BookScreen'
import TabBar from '../components/TabBar'
import ProfileStack from '../navigation/ProfileStack'
import CategoryStack from './CategoryStack'
import LocationStack from './LocationStack'


const Tab = createBottomTabNavigator();


const TabNavigator = () => {
    return (
        <Tab.Navigator tabBar={props => <TabBar {...props} />}
            screenOptions={{ headerTransparent: true, title: '' }}
            initialRouteName="Home"
        >
            <Tab.Screen name='CategoryStack' component={CategoryStack} initialParams={{ icon: 'search' }} />
            <Tab.Screen name='Book' component={BookScreen} initialParams={{ icon: 'bookmark' }} />
            <Tab.Screen name='Home' component={HomeScreen} initialParams={{ icon: 'home' }} />
            <Tab.Screen name='LocationStack' component={LocationStack} options={{ tabBarBadge: 3 }} initialParams={{ icon: 'message-square' }} />
            <Tab.Screen name='ProfileStack' component={ProfileStack} initialParams={{ icon: 'user' }} />
        </Tab.Navigator>
    );
};

export default TabNavigator;

const styles = StyleSheet.create({})