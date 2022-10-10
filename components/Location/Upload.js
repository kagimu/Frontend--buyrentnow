import { Button, Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import tw from 'twrnc';

const Upload = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <View >
                <Text>Add Atleast Five images of your space</Text>
                <TouchableOpacity>
                    <Image
                        source={{ uri: 'https://i.imgur.com/yyyGewD.png' }}
                        style={{
                            width: 100,
                            height: 100,
                            justifyContent: 'center',
                            alignContent: 'space-around',
                            marginTop: 60,

                        }}

                    />
                </TouchableOpacity>

            </View>
        </View>

    )
}

export default Upload

const styles = StyleSheet.create({

    container: {
        margin: 30,
        backgroundColor: '#fff',

    },

})