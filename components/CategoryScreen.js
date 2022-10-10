import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from "react";
import SearchBar from './SearchBar'


const CategoryScreen = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>

            <SearchBar
            />

            <TouchableOpacity onPress={() => navigation.navigate('CategoryDetails')}>
                <Image
                    style={styles.tinyLogo}

                    source={{
                        uri: 'https://i.imgur.com/jfOPLEw.png',
                    }}
                />

                <Text
                    style={{ position: 'absolute', top: 60, left: 50, right: 0, bottom: 0, color: 'white', fontSize: 20, fontWeight: 'bold', }}>Studios</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('CategoryDetails')}>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: 'https://i.imgur.com/BMla6XU.png',
                    }}
                />
                <Text
                    style={{
                        position: 'absolute', top: 60, left: 50, right: 0,
                        bottom: 0, color: 'white', fontSize: 20, fontWeight: 'bold',
                    }}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('CategoryDetails')}>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: 'https://i.imgur.com/BctAvvn.png',
                    }}
                />
                <Text
                    style={{
                        position: 'absolute', top: 60, left: 50, right: 0,
                        bottom: 0, color: 'white', fontSize: 20, fontWeight: 'bold',
                    }}>Sceneries and {'\n'}Recreation</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('CategoryDetails')}>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: 'https://i.imgur.com/DPFojAG.png',
                    }}
                />
                <Text
                    style={{
                        position: 'absolute', top: 60, left: 50, right: 0,
                        bottom: 0, color: 'white', fontSize: 20, fontWeight: 'bold',
                    }}>Education {'\n'} Centres</Text>
            </TouchableOpacity>
            <View style={{ margin: 45, }}>

            </View>

        </ScrollView>
    )
}

export default CategoryScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'

    },
    tinyLogo: {
        height: 150,
        width: 300,
        resizeMode: 'contain',
        alignItems: 'center',
        marginRight: 10,
        marginLeft: 30,
        paddingLeft: 20,



    },
})