import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const BookingConfirmation = () => {

    const navigation = useNavigation()

    return (
        <View>
            <Button
                title='BookingConfirmation'
                onPress={() => navigation.navigate('RatingAndComments')}
            />

        </View>
    )
}

export default BookingConfirmation

const styles = StyleSheet.create({})