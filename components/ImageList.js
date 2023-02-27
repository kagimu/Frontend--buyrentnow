import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'twrnc';

const data = [
    {
        id: '1',
        image: 'https://i.imgur.com/ot0HvJS.jpg',
    },
    {
        id: '2',
        image: 'https://i.imgur.com/E7LjeCk.jpg',
    },
    {
        id: '3',
        image: 'https://i.imgur.com/Vh9Tjyo.jpg',
    },
    {
        id: '4',
        image: 'https://i.imgur.com/8qOFfKb.jpg',
    },

]


const ImageList = () => {
    return (
        <View>
            <FlatList
                data={data}

                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                    <View style={tw``}>
                        <Image
                            style={styles.image}
                            source={{ uri: item.image }}
                        />
                    </View>
                )}
            />
        </View>
    )
}

export default ImageList

const styles = StyleSheet.create({
    image: {
        height: 100,
        width: 140,
        resizeMode: 'cover',
        borderRadius: 15,
        marginLeft: 5,
        marginTop: 5,


    }
})