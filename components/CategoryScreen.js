import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from "react";
import SearchBar from './SearchBar'
import TopTab from '../TopTab';
import { Container, Tab, Tabs } from 'native-base';


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
            <Container>
                <Tabs>
                    <Tab
                        heading='Green Tab'>
                        <View style={styles.container}>
                            <Text style={styles.title}>Green Screen</Text>
                        </View>
                    </Tab>
                    <Tab heading='Tab 2'>
                        <TopTab />
                    </Tab>
                    <Tab heading='Tab 3'>
                        <Tab2 />
                    </Tab>
                </Tabs>
            </Container>

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