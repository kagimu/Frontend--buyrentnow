import { Button, ScrollView, StyleSheet, Text } from 'react-native'
import React from 'react'
import { Locations } from '../data/locations'
import Posts from './Posts'



const BookScreen = () => {

    return (
        <ScrollView
            style={styles.container}

        >
            <Text style={styles.text} >Saved Places</Text>
            {Locations.map((location, index) =>
                <Posts location={location} key={index} />
            )}


        </ScrollView>
    )
}

export default BookScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    text: {
        fontWeight: '900',
        fontSize: 25,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 20,
    },
})