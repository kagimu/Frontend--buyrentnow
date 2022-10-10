import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React from 'react'


const RatingAndComments = () => {
    const navigation = useNavigation()

    return (
        <View>
            <Text
                onPress={() => navigation.navigate('BookingConfirmation')}
            >
                RatingAndComments</Text>


        </View>
    )
}

export default RatingAndComments

const styles = StyleSheet.create({})