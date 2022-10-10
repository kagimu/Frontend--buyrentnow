import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const PaymentDetails = () => {

    const navigation = useNavigation()

    return (
        <View>
            <Text>PaymentDetails</Text>
            <Button title='go to Booking confirmations' onPress={() => navigation.navigate('BookingConfirmation')} />
        </View>
    )
}

export default PaymentDetails

const styles = StyleSheet.create({})