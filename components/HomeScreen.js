import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import CardOptions from './CardOptions';

import tw from 'twrnc';


const HomeScreen = ({ navigation }) => {

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >

            <Text style={styles.text}>Find A Location for {'\n'}Your Next Big Activity.</Text>

            <Image
                style={{
                    height: 250,
                    width: 300,
                    resizeMode: 'cover',
                    marginTop: 15,
                    marginLeft: 30,
                    borderRadius: 10,
                }}
                source={{
                    uri: 'https://i.imgur.com/yyyGewD.png',
                }}
            />

            <Text
                style={[tw`text-xl font-bold text-center p-4 bg-blue-500 rounded-full m-2`, styles.Button]}
                onPress={() => navigation.navigate('Posts')}
            >

                Scout
            </Text>

            <Text style={styles.text1}>Recently Added Locations</Text>

            <CardOptions />

            <Text style={tw`text-center text-sm p-4x mt-2 pl--5 underline`}>See More</Text>



        </ScrollView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 20,
        fontWeight: '900',
        marginTop: 40,
        marginLeft: 20,
    },
    Button: {
        margin: 20,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: '#387981',
        color: 'white',
        padding: 15,
        fontSize: 18,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    text1: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 30,
        marginLeft: 20,
    },
    homeLower: {
        width: 320,
        height: 320,
        resizeMode: 'contain',
        padding: 10,
        marginLeft: 20,

    },
    buttonLower: {
        backgroundColor: '#fff',
        borderColor: '#387981',
        borderWidth: 2,
        color: '#387981',
        marginBottom: 10,
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        borderBottomRightRadius: 18,
        borderBottomLeftRadius: 18,
    },
})