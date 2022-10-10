import { Button, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React from 'react'

const LocationPin = () => {
    const navigation = useNavigation()
    return (
        <View>
            <Text>LocationPin</Text>
            <Button
                title='Give your Location A Price rate'
                onPress={() => navigation.navigate('Prices')}
            />
        </View>
    )
}

export default LocationPin

const styles = StyleSheet.create({})