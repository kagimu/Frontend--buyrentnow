import { Button, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React from 'react'

const Prices = () => {
    const navigation = useNavigation()
    return (
        <View>
            <Text>Prices</Text>
            <Button
                title='Confirm Details'
                onPress={() => navigation.navigate('Confirm')}
            />
        </View>
    )
}

export default Prices

const styles = StyleSheet.create({})