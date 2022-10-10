import { Button, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React from 'react'

const LocationName = () => {
    const navigation = useNavigation()
    return (
        <View>
            <Text>LocationName</Text>
            <Button
                title='Give your Location A Pin'
                onPress={() => navigation.navigate('LocationPin')}
            />
        </View>
    )
}

export default LocationName

const styles = StyleSheet.create({})