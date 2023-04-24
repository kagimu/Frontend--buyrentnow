import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import React, { useEffect, useState } from 'react'
import tw from 'twrnc';



const RegisterForm = ({ onSubmit }) => {

    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');

    return (
        <View>
            <View>
                <Text style={tw`font-bold p-10 ml--2 pb-10 text-lg`}>Register</Text>

                <View style={styles.input}>
                    <TextInput
                        placeholderTextColor='#D3D3D3'
                        placeholder='FirstName'
                        value={first_name}
                        textContentType='phone'
                        autoFocus={true}
                        onChangeText={(text) => setFirst_name(text)}
                    />
                </View>

                <View style={styles.input}>
                    <TextInput
                        placeholderTextColor='#D3D3D3'
                        placeholder='LastName'
                        value={last_name}
                        textContentType='phone'
                        autoFocus={true}
                        onChangeText={(text) => setLast_name(text)}
                    />
                </View>

                <View style={styles.input}>
                    <TextInput
                        placeholderTextColor='#D3D3D3'
                        placeholder='Email'
                        value={email}
                        textContentType='phone'
                        autoFocus={true}
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>

                <View style={styles.input}>
                    <TextInput
                        placeholderTextColor='#D3D3D3'
                        placeholder='phonenumber'
                        value={phone}
                        textContentType='phone'
                        autoFocus={true}
                        onChangeText={(text) => setPhone(text)}
                    />
                </View>

            </View>

            <View style={styles.input}>
                <TextInput
                    placeholderTextColor='#D3D3D3'
                    placeholder='Password'
                    value={password}
                    secureTextEntry={true}
                    textContentType='password'
                    onChangeText={(text) => setPassword(text)}
                />
            </View>

            <View style={{ paddingTop: 15, paddingBottom: 15, }}>
                <TouchableOpacity
                    onPress={() => onSubmit(first_name, last_name, email, phone, password)}
                    style={styles.login}
                >
                    <Text style={styles.login}>
                        Register
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default RegisterForm

const styles = StyleSheet.create({

    input: {
        borderRadius: 8,
        padding: 10,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: '#387981',
        marginHorizontal: 30,
    },
    login: {
        marginHorizontal: 30,
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#387981',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '900',
        borderRadius: 10,

    },
    google: {
        height: 40,
        width: 40,
        marginLeft: 30,
        marginBottom: 20,
    },
    signup: {
        color: '#6BB0F5',
        marginLeft: 30,
        fontSize: 14,
        marginBottom: 2,
    },
    terms: {
        marginLeft: 30,
        marginTop: 10,
        color: '#444',
        fontSize: 13,
    },
    register: {
        padding: 10,
        borderColor: '#387981',
        marginLeft: 30,
        backgroundColor: '#fff',
        fontWeight: "900",
        borderWidth: 2,
        borderRadius: 8,
        marginHorizontal: 30,
        color: '#387981',
        alignItems: 'center',
        justifyContent: 'center',
    },

})