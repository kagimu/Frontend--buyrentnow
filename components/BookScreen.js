import { Button, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { Locations } from '../data/locations'
import Posts from './Posts'



const BookScreen = () => {

    return (
        <ScrollView
            style={styles.container}
        >
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
})