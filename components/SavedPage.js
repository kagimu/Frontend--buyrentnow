import { FlatList, Image, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'
import Axios from 'axios';
import tw from 'twrnc';
import { BASE_URL } from '@env'
import { Ionicons, AntDesign, Octicons } from '@expo/vector-icons';


const SavedPage = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        const token = getToken();
        Axios.get(`${BASE_URL}/api/posts`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`, // auth token
            }
        })
            .then(({ data }) => {
                console.log("defaultApp -> data", data)
                setData(data)
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);


    return (
        <View>
            <Text style={{
                fontSize: 19,
                textAlign: 'left',
                fontWeight: 'bold',
                padding: 20,
                marginLeft: 8,
            }}>Saved Properties</Text>
            {isLoading ? <ActivityIndicator /> : (
                <FlatList
                    data={data}
                    Vertical
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (


                        <View style={[styles.card, tw`pb-8 pt--2 bg-gray-100 m-1`]}>
                            <Image
                                style={[styles.image, tw``]}
                                source={{ uri: item.image }}
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
            )}
        </View>

    )
}

export default SavedPage

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