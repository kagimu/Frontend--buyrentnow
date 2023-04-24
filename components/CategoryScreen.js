import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import tw from 'twrnc';
import CardOptions from './CardOptions';
import Category from './Category';
import CategoryDetails from './CategoryDetails';
//import { BASE_URL } from '@env'


const CategoryScreen = ({ navigation }) => {


    return (
        <View style={tw`pt-8`}>
            <View>
                <Category
                />
            </View>

            <View >
                <CategoryDetails navigation={navigation} />
            </View>

        </View>
    )
}

export default CategoryScreen

const styles = StyleSheet.create({
    card2: {
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        backgroundColor: '#fff',
        borderColor: '#D8D8D8',
        borderWidth: 2,
        padding: 3,

    },
    word: {
        padding: 5,
        fontWeight: '500',
        fontSize: 20,
        alignContent: 'center',
        textAlign: 'center',
    },
    image: {
        height: 220,
        width: 330,
        alignContent: 'center',
        justifyContent: 'center',
        resizeMode: 'contain',
        marginLeft: 30,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    card: {
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,

    },
    row: {
        fontSize: 12,
        paddingLeft: 0,

    }
})
