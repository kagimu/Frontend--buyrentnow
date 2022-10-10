import { Button, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React from 'react'


const LocationCategory = () => {
    const navigation = useNavigation()
    return (
        <View styles={styles.container}>
            <Text>LocationCategory</Text>
            <Button
                title='Upload your image'
                onPress={() => navigation.navigate('Upload')}
            />
        </View>
    )
}

export default LocationCategory

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
})