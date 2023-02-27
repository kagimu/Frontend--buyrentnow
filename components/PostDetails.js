import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { Octicons, FontAwesome5 } from '@expo/vector-icons';

const data = [
    {
        id: '1',
        title: 'Agricultural Land Nkonkonjeru Mukono',
        price: 'UGX 20,000,000',
        dollarPrice: '2600',
        location: 'Nkonkonjeru town, Bubwa village',
        size: '60 Acres',
        status: 'For Sale',
        image: 'https://i.imgur.com/n6DWTUo.jpg',
        imageUrl: ['https://i.imgur.com/n6DWTUo.jpg', 'https://i.imgur.com/n6DWTUo.jpg', 'https://i.imgur.com/n6DWTUo.jpg', 'https://i.imgur.com/n6DWTUo.jpg',],
        screen: 'CategoryScreen',
        type: 'Residential',
        category: 'Land',
        description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
    },
]



const PostDetails = () => {
    const navigation = useNavigation();
    return (
        <View>
            <FlatList
                data={data}
                Vertical
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.card, tw`pb-8 pt--2 bg-gray-100 `]}>
                        <Image
                            style={[styles.image, tw``]}
                            source={{ uri: item.image }}

                        />

                        <Text style={tw` pl-2 mt-2 text-lg font-bold`}>{item.title}</Text>

                        <View styles={{ flexDirection: 'row', marginTop: 7 }}>
                            <Octicons name="location" size={14} color="#45A76E" style={{ marginTop: 15, marginLeft: 20, }} />
                            <Text style={[styles.row, tw` pl-10 mt--4 `]}>{item.location}</Text>
                        </View>


                        <View style={{
                            flexDirection: 'row',
                            marginTop: 10,
                        }}>
                            <View style={{ flexDirection: 'row' }}>
                                <FontAwesome5 name="tape" size={12} color="#45A76E" style={{ marginLeft: 21, marginTop: 10, }} />
                                <Text style={[styles.row, tw` pl-1 mt-2`]}>{item.size}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <FontAwesome5 name="circle-notch" size={12} color="#45A76E" style={{ marginLeft: 50, marginTop: 10 }} />
                                <Text style={[styles.row, tw` pl-2 mt-2`]}>{item.status}</Text>
                            </View>
                            <Text style={[styles.type, tw` pl-10 mt-2 font-bold`]}>Type</Text>
                            <Text style={[styles.price, tw` pl-2 mt-2 font-bold`]}>{item.type}</Text>
                        </View>


                        <View>
                            <Text style={tw` pl-6 mt-8 text-sm font-bold`}>Description</Text>
                            <Text style={tw` pl-6 mt-2 text-sm `}>{item.description}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row', backgroundColor: '#fff', padding: 10, marginTop: 10, marginLeft: 10, marginRight: 10,
                            borderRadius: 10, marginBottom: -10,
                        }}>

                            <View style={tw`pl-1`}>
                                <Text style={{ fontSize: 12, }}>Price in UGX</Text>
                                <Text style={{ fontWeight: '900', fontSize: 14, }}>{item.price}</Text>
                                <Text style={{ fontSize: 12, }}>${item.dollarPrice}</Text>
                            </View>
                            <View style={{
                                marginLeft: 40, backgroundColor: '#34779A', padding: 15, justifyContent: 'center',
                                borderRadius: 20,
                            }}>
                                <TouchableOpacity>
                                    <Text style={{ color: 'white', fontWeight: '900', fontSize: 20 }}
                                        onPress={() => navigation.navigate('AgentForm')}
                                    >Contact an agent</Text>
                                </TouchableOpacity>
                            </View>

                        </View>


                    </View>

                )}
            />
        </View>
    )
}

export default PostDetails

const styles = StyleSheet.create({
    image: {
        width: 360,
        height: 330,
        resizeMode: 'cover',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginLeft: 0,
    },
    card: {
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,

    },
    row: {
        fontSize: 12,
        paddingLeft: 3,
    },
    price: {
        fontSize: 12,
    },
    type: {
        fontSize: 12,
        color: '#45A76E',
    }
})