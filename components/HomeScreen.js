import { Button, Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CardOptions from './CardOptions';
import tw from 'twrnc';
import HomeCategories from './HomeCategories';


const image = { uri: "https://i.imgur.com/78lC493.jpg" };

const HomeScreen = ({ navigation }) => {


    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >


            <ImageBackground
                style={{
                    height: 150,
                    width: 300,
                    resizeMode: 'cover',
                    marginTop: 25,
                    marginBottom: 20,
                    marginLeft: 30,
                    marginRight: 20,

                }}
                source={{
                    uri: 'https://i.imgur.com/GCjnNOS.jpg',
                }}
                imageStyle={{ borderRadius: 10 }}


            >

                <Text style={styles.text}>Property searching {'\n'}made easy</Text>


            </ImageBackground>


            <Text style={styles.text0}>You can now easily find a property you like across the country</Text>

            <HomeCategories style={{ marginLeft: 30, }} />


            <Text style={styles.text1}>Recently Added</Text>
            <Text style={styles.text3}>Find Recently added Apartments, Houses and lands.</Text>

            <CardOptions />

            <View style={{ flex: 1 }}>
                <Text style={[styles.heading, tw` p-4x`]}>Am selling</Text>
                <Text style={[styles.subheading, tw`text-center p-4x`]}>Lets help you sell your property with ease</Text>

                <ImageBackground source={image} style={styles.image} imageStyle={{ borderRadius: 10 }} >
                    <Text
                        style={[tw`text-xl font-bold text-center bg-blue-500 rounded-full mt-30`, styles.Button]}
                        onPress={() => navigation.navigate('BookingConfirmation')}
                    >
                        Add property
                    </Text>
                </ImageBackground>
            </View>




        </ScrollView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        backgroundColor: '#F6F8FC',

    },
    image: {
        height: 200,
        width: 300,
        alignContent: 'center',
        resizeMode: 'cover',
        justifyContent: 'center',
        marginBottom: 40,
        marginLeft: 30,
    },
    text: {
        fontSize: 25,
        fontWeight: '900',
        marginTop: 40,
        marginLeft: 20,
        color: 'white',
    },
    Button: {
        margin: 10,
        marginLeft: 60,
        marginRight: 50,
        backgroundColor: '#fff',
        color: 'black',
        padding: 12,
        fontSize: 18,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    text0: {
        fontSize: 13,
        marginTop: 10,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 30,
    },
    text1: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 30,
        marginLeft: 30,
    },
    text3: {
        fontSize: 12,
        marginTop: 4,
        marginBottom: 14,
        marginLeft: 30,
    },
    homeLower: {
        width: 320,
        height: 320,
        resizeMode: 'contain',
        padding: 10,
        marginLeft: 20,

    },
    buttonLower: {
        backgroundColor: '#fff',
        borderColor: '#387981',
        borderWidth: 2,
        color: '#387981',
        marginBottom: 10,
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        borderBottomRightRadius: 18,
        borderBottomLeftRadius: 18,
    },
    heading: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: '900',
    },
    subheading: {
        fontSize: 12,
        fontWeight: '200',
        textAlign: 'center',
        marginTop: -20,
    }
})