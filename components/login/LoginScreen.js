import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoginForm from './LoginForm';
import { useNavigation } from '@react-navigation/native'

const SCOUTAP_LOGO = 'https://i.imgur.com/73Xzapj.png';

const LoginScreen = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <View
                style={styles.logoContainer}>
                <Text style={styles.text}>scoutap</Text>
                <Image source={{ uri: SCOUTAP_LOGO, height: 40, width: 40, }} />
            </View>
            <LoginForm navigation={navigation} />
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