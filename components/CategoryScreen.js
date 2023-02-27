import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Apartments from './TopTabs/Apartments';
import Commercial from './TopTabs/Commercial';
import Houses from './TopTabs/Houses';
import Land from './TopTabs/Land';



const AllScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>CallScreen</Text>
        </View>
    );
}


const Tab = createMaterialTopTabNavigator();


const CategoryScreen = () => {
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator
                screenOptions={{
                    headerShadowVisible: false,
                    tabBarIndicatorStyle: { backgroundColor: '#34779A' },
                    tabBarActiveTintColor: '#fff',
                    tabBarInactiveTintColor: '#000',
                    tabBarScrollEnabled: true,
                    lazy: true,
                    tabBarLabelStyle: { fontSize: 12, fontWeight: '900', padding: 8, backgroundColor: '#34779A', borderRadius: 10, },
                    tabBarItemStyle: { width: 130 },
                }}
            >
                <Tab.Screen name='ALL' component={AllScreen} />
                <Tab.Screen name='LAND' component={Land} />
                <Tab.Screen name='APARTMENTS' component={Apartments} />
                <Tab.Screen name='HOUSES' component={Houses} />
                <Tab.Screen name='COMMERCIAL' component={Commercial} />
            </Tab.Navigator>

            <StatusBar />

        </NavigationContainer>

    );

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },

    text: {

        fontSize: 15,

    },

});


export default CategoryScreen;