import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BookingConfirmation from './BookingConfirmation';
import { BASE_URL } from '@env'
import axios from 'axios';
import { getToken } from '../../token';


const AddPost = ({ navigation }) => {
    const add_post = async (type, name, desc, price, location, size, status, images) => {
        const token = await getToken();

        if (!type, !name, !desc, !price, !location, !size, !status && !images)
            alert('please enter all the required fields')
        else {

            axios.post(`${BASE_URL}/api/posts`, { type: type, name: name, desc: desc, price: price, location: location, size: size, status: status, images: images }, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`, // auth token
                }

            }, {
                validateStatus: function (status) {
                    return status < 500; // Resolve only if the status code is less than 500
                }

            }
            ).then((response) => {
                console.log('getting data from axios', response.data);
                navigation.replace('HomeScreen');

            })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    return (
        <View style={styles.container}>
            {!!successMessage && <Text style={tw`bg-green-400 p-1 my-2 text-green-700`}> {successMessage}</Text>}
            <BookingConfirmation navigation={navigation} onSubmit={add_post} />
        </View>
    )
}

export default AddPost

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 20,
        paddingHorizontal: 12,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,

    },
    text: {
        marginTop: 10,
        fontSize: 40,
        fontWeight: '900',
        color: '#387981',
        marginBottom: 30,
        marginLeft: 30,
        letterSpacing: -2,
    },

})