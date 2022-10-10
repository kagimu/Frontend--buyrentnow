import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'twrnc';

const data = [
    {
        id: '1',
        title: 'Net Studios Africa',
        image: 'https://i.imgur.com/yk3vJ82.jpg',
        screen: 'CategoryScreen',
    },
    {
        id: '2',
        title: 'Grips and Parks',
        image: 'https://i.imgur.com/sDaZ1R2.jpg?1',
        screen: 'CategoryScreen',
    },
    {
        id: '3',
        title: 'Crystal',
        image: 'https://i.imgur.com/0EnG6K6.jpg',
        screen: 'CategoryScreen',
    },
    {
        id: '4',
        title: 'Net Studios Africa',
        image: 'https://i.imgur.com/mJKyIYA.jpg',
        screen: 'CategoryScreen',
    },
    {
        id: '5',
        title: 'Net Studios Africa',
        image: 'https://i.imgur.com/YVjHHis.jpg',
        screen: 'CategoryScreen',
    },
]

const CardOptions = () => {
    return (
        <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={[styles.card, tw`pb-8 pt--2 bg-gray-100 m-1`]}>
                    <Image
                        style={[styles.image, tw``]}
                        source={{ uri: item.image }}
                    />
                    <Text style={tw` pl-2 mt-2 text-sm font-semibold`}>{item.title}</Text>
                </View>
            )}
        />
    )
}

export default CardOptions

const styles = StyleSheet.create({
    image: {
        width: 130,
        height: 90,
        resizeMode: 'contain',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    card: {
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,

    },
})