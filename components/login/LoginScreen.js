import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import LoginForm from './LoginForm';
import { BASE_URL } from '@env'
import axios from 'axios';
import { getToken } from '../../token';


const LoginScreen = ({ navigation }) => {


    const [successMessage, setSuccess] = useState('')



    const login = async (phone, password) => {
        const token = await getToken();

        if (!phone && !password)
            alert('please enter all the required fields')
        else {

            axios.post(`${BASE_URL}/api/login`, { phone: phone, password: password }, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`, // auth token
                }
            }).then((response) => {
                console.log('getting data from axios', response.data);
                navigation.replace('TabNavigator');

            })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    return (
        <View style={styles.container}>
            {!!successMessage && <Text style={tw`bg-green-400 p-1 my-2 text-green-700`}> {successMessage}</Text>}
            <LoginForm navigation={navigation} signup={true} onSubmit={login} />
        </View>
    )
}

export default LoginScreen

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