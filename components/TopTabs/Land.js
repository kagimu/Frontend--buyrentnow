import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import { Ionicons, AntDesign, Octicons } from '@expo/vector-icons';
import { ImageSlider } from "react-native-image-slider-banner";

const data = [
    {
        id: '1',
        title: 'Agricultural Land Nkonkonjeru Mukono',
        price: 'UGX 20,000,000',
        location: 'Nkonkonjeru town, Bubwa village',
        size: '60 Acres',
        status: 'For Sale',
        imageUrl: ['https://i.imgur.com/n6DWTUo.jpg', 'https://i.imgur.com/n6DWTUo.jpg', 'https://i.imgur.com/n6DWTUo.jpg', 'https://i.imgur.com/n6DWTUo.jpg',],
        image: 'https://i.imgur.com/n6DWTUo.jpg',
        screen: 'CategoryScreen',
    },
    {
        id: '2',
        title: 'Agricultural Land Nkonkonjeru Mukono',
        price: 'UGX 20,000,000',
        location: 'Nkonkonjeru town, Bubwa village',
        size: '60 Acres',
        status: 'For Sale',
        imageUrl: ['https://i.imgur.com/n6DWTUo.jpg', 'https://i.imgur.com/n6DWTUo.jpg', 'https://i.imgur.com/n6DWTUo.jpg', 'https://i.imgur.com/n6DWTUo.jpg',],
        image: 'https://i.imgur.com/hukecEk.jpg',
        screen: 'CategoryScreen',
    },
    {
        id: '3',
        title: 'Agricultural Land Nkonkonjeru Mukono',
        price: 'UGX 20,000,000',
        location: 'Nkonkonjeru town, Bubwa village',
        size: '60 Acres',
        status: 'For Sale',
        imageUrl: ['https://i.imgur.com/n6DWTUo.jpg', 'https://i.imgur.com/n6DWTUo.jpg', 'https://i.imgur.com/n6DWTUo.jpg', 'https://i.imgur.com/n6DWTUo.jpg',],
        image: 'https://i.imgur.com/n6DWTUo.jpg',
        screen: 'CategoryScreen',
    },
    {
        id: '4',
        title: 'Agricultural Land Nkonkonjeru Mukono',
        price: 'UGX 20,000,000',
        location: 'Nkonkonjeru town, Bubwa village',
        size: '60 Acres',
        status: 'For Sale',
        imageUrl: ['https://i.imgur.com/n6DWTUo.jpg', 'https://i.imgur.com/n6DWTUo.jpg', 'https://i.imgur.com/n6DWTUo.jpg', 'https://i.imgur.com/n6DWTUo.jpg',],
        image: 'https://i.imgur.com/n6DWTUo.jpg',
        screen: 'CategoryScreen',
    },
    {
        id: '5',
        title: 'Agricultural Land Nkonkonjeru Mukono',
        price: 'UGX 20,000,000',
        location: 'Nkonkonjeru town, Bubwa village',
        size: '60 Acres',
        status: 'For Sale',
        imageUrl: ['https://i.imgur.com/n6DWTUo.jpg', 'https://i.imgur.com/n6DWTUo.jpg', 'https://i.imgur.com/n6DWTUo.jpg', 'https://i.imgur.com/n6DWTUo.jpg',],
        image: 'https://i.imgur.com/n6DWTUo.jpg',
        screen: 'CategoryScreen',
    },
]
const Land = () => {
    return (
        <View>
            <Text style={{
                fontSize: 19,
                textAlign: 'left',
                fontWeight: 'bold',
                padding: 20,
                marginLeft: 8,
            }}>Saved Properties</Text>

            <FlatList
                data={data}
                Vertical
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.card, tw`pb-8 pt--2 bg-gray-100 m-1`]}>
                        <ImageSlider
                            data={[item.imageUrl]}
                            autoPlay={false}
                            onItemChanged={(item) => console.log("item", item)}
                            closeIconColor="#fff"
                        />
                        <AntDesign name="heart" color="#fff" size={30} style={{ position: 'absolute', top: 15, left: 290 }} />
                        <View style={{
                            flexDirection: 'row',
                            marginLeft: 30,
                        }}>
                            <Text style={tw` pl-2 mt-2 text-sm font-bold`}>{item.price}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Ionicons name="resize" size={12} color="#6495ED" style={{ marginLeft: 30, marginTop: 10, }} />
                                <Text style={[styles.row, tw` pl-1 mt-2`]}>{item.size}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <AntDesign name="reload1" size={12} color="#6495ED" style={{ marginLeft: 30, marginTop: 10 }} />
                                <Text style={[styles.row, tw` pl-2 mt-2`]}>{item.status}</Text>
                            </View>


                        </View>
                        <View style={{

                            marginLeft: 30,

                        }}>
                            <Text style={tw` pl-2 mt-2 text-sm font-bold`}>{item.title}</Text>
                            <View styles={{ flexDirection: 'row' }}>
                                <Octicons name="location" size={14} color="#45A76E" style={{ marginTop: 1, marginLeft: 8, }} />
                                <Text style={[styles.row, tw` pl-5 mt--4`]}>{item.location}</Text>
                            </View>

                        </View>


                    </View>
                )}
            />
        </View>

    )
}

export default Land

const styles = StyleSheet.create({
    image: {
        width: 300,
        height: 200,
        alignContent: 'center',
        justifyContent: 'center',
        resizeMode: 'contain',
        marginLeft: 30,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    card: {
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,

    },
    row: {
        fontSize: 12,
        paddingLeft: 0,

    }
})