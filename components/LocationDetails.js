import { Button, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React from 'react'


const LocationDetails = () => {

    const navigation = useNavigation()

    return (
        <View>
            <Text>LocationDetails</Text>
            <Button
                title='go to payment options'
                onPress={() => navigation.navigate('PaymentDetails')}
            />
        </View>
    )
}

export default LocationDetails

const styles = StyleSheet.create({})