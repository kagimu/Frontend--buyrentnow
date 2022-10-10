import { Button, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { Locations } from '../data/locations'
import Posts from './Posts'



const CategoryDetails = ({ navigation }) => {

    return (
        <ScrollView
            style={styles.container}
        >
            <Button
                title='go to location details'
                onPress={() => navigation.navigate('LocationDetails')}
            />
            {Locations.map((location, index) =>
                <Posts location={location} key={index} />
            )}


        </ScrollView>
    )
}

export default CategoryDetails

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
})