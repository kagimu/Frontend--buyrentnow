import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import tw from 'twrnc';


const data = [
    {
        id: '1',
        title: 'Land',
        image: 'https://i.imgur.com/rrx2APb.jpg',
        screen: 'CategoryScreen',
    },
    {
        id: '2',
        title: 'Apartments',
        image: 'https://i.imgur.com/Vh9Tjyo.jpg',
        screen: 'CategoryScreen',
    },
    {
        id: '3',
        title: 'Houses',
        image: 'https://i.imgur.com/3a5J8VD.jpg',
        screen: 'CategoryScreen',
    },
    {
        id: '4',
        title: 'Commercial',
        image: 'https://i.imgur.com/E7LjeCk.jpg',
        screen: 'CategoryScreen',
    },

]

const HomeCategories = () => {
    const navigation = useNavigation();

    return (
        <View style={tw`pl-5`}>
            <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (

                    <View style={[styles.card, tw`pb-2 pt--2 m-2 `]}>
                        <TouchableOpacity onPress={() => navigation.navigate('CategoryScreen')}>
                            <Image
                                style={[styles.image, tw``]}
                                source={{ uri: item.image }}
                            />
                            <Text style={styles.word}>{item.title}</Text>
                        </TouchableOpacity>

                    </View>


                )}
            />
        </View>
    )
}

export default HomeCategories

const styles = StyleSheet.create({
    image: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        padding: 10,
        borderColor: 'gray',
        borderWidth: 2,
        marginLeft: 2,



    },
    card: {
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,

    },
    word: {
        padding: 10,
        fontWeight: 'bold',
        fontSize: 13,
        alignContent: 'center',
        textAlign: 'center',
    }
})