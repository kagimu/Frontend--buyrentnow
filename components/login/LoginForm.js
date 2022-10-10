import { Button, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc';
import validator from 'email-validator'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../../firebase';


const LoginForm = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('TabNavigator')
      }
    })

    return unsubscribe
  }, [])

  const handleLogin = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('logged in with', user.email);
      })
      .catch(error => alert(error.message))
  }

  const handleSignup = () => {
    auth
      .createUserWithEmailAndPassword(email,)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('registered with', user.email);
      })
      .catch(error => alert(error.message))
  }

  return (
    <View>
      <View>
        <Text style={tw`font-bold p-4 ml-4`}>Sign In</Text>

        <View
          style={[
            styles.input,
            {
              borderColor: values.email.length < 1 || validator.validate(values.email) ?
                '#ccc' :
                'red'
            },
          ]}>
          <TextInput
            placeholderTextColor='#D3D3D3'
            placeholder='email or phonenumber'
            autoCapitalize='none'
            keyboardType='email-address'
            textContentType='emailAddress'
            autoFocus={true}
            onChangeText={text => setEmail(text)}
            value={values.email}
          />
        </View>

        <View style={[styles.input,
        {
          borderColor: values.password.length < 1 || values.password.length > 6 ?
            '#ccc' :
            'red'
        },
        ]}>
          <TextInput
            placeholderTextColor='#D3D3D3'
            placeholder='Password'
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={true}
            textContentType='password'
            onChangeText={text => setPassword(text)}
            value={values.password}
          />
        </View>

        <Pressable
          onPress={handleLogin}

        >
          <Text style={[tw`font-bold text-center p-4 `, styles.login]}>
            Log In
          </Text>
        </Pressable>


        <View>
          <Text style={tw`p-4 ml-4`}>Or Login With</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
            <Image source={{ uri: 'https://i.imgur.com/oPhraRe.png' }}
              style={styles.google}
            />
            <Text style={{ marginRight: 30, marginTop: 8, color: '#444', }}>Skip</Text>
          </View>

        </View>

        <View>
          <Text
            style={styles.signup}
            onPress={handleSignup}
          >
            I dont have an Account, SignUp?</Text>
        </View>

        <View>
          <Text style={styles.terms}>Terms and Conditions</Text>
        </View>

      </View>


    </View>
  )
}

export default LoginForm

const styles = StyleSheet.create({

  input: {
    borderRadius: 8,
    padding: 10,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#387981',
    marginHorizontal: 30,
  },
  login: isValid => ({
    marginHorizontal: 30,
    borderRadius: 8,
    padding: 10,
    backgroundColor: isValid ? '#387981' : '#78B9C1',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '900',
    borderRadius: 8,
    marginBottom: 20,
  }),
  google: {
    height: 40,
    width: 40,
    marginLeft: 30,
    marginBottom: 30,
  },
  signup: {
    color: '#6BB0F5',
    marginLeft: 30,
    fontSize: 14,
  },
  terms: {
    marginLeft: 30,
    marginTop: 20,
    color: '#444',
    fontSize: 13,
  },

})