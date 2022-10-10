
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import tw from 'twrnc';


const AddLocation = () => {
    const navigation = useNavigation()
    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <Image
                style={[styles.homeLower]}
                source={{ uri: 'https://i.imgur.com/uQTzIQN.png' }}
            />

            <Text style={tw`text-lg p-6 font-extrabold pl--5 text-center pb-10`}>
                Share your Favorite {'\n'} Locations and Help {'\n'} Another person find it
            </Text>

            <TouchableOpacity
                onPress={() => navigation.navigate('LocationCategory')}>
                <Text style={[tw`text-lg font-bold text-center p-4 rounded-full mr-12 ml-12`, styles.buttonLower]} >
                    Share a Location
                </Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default AddLocation

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
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
    }
})