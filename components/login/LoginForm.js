import { Button, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc';
import { authentication } from '../../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';



const LoginForm = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isSignedIn, setIsSignedIn] = useState(false)

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged(user => {
      if (user) {
        navigation.replace('TabNavigator')
      }
    })

    return unsubscribe
  }, [])


  const RegisterUser = () => {
    createUserWithEmailAndPassword(authentication, email, password)
      .then((re) => {
        console.log(re);
        setIsSignedIn(true)
      })
      .catch((re) => {
        console.log(re);
      })
  }

  const LoginUser = () => {
    signInWithEmailAndPassword(authentication, email, password)
      .then((re) => {
        console.log(re);
        setIsSignedIn(true)
      })
      .catch((re) => {
        console.log(re);
      })
  }

  const LogoutUser = () => {
    signOut(authentication, email, password)
      .then((re) => {
        console.log(re);
        setIsSignedIn(false)
      })
      .catch((re) => {
        console.log(re);
      })
  }



  return (
    <View>
      <View>
        <Text style={tw`font-bold p-2 ml-4`}>Sign In</Text>

        <View style={styles.input}>
          <TextInput
            placeholderTextColor='#D3D3D3'
            placeholder='email or phonenumber'
            value={email}
            keyboardType='email-address'
            textContentType='emailAddress'
            autoFocus={true}
            onChangeText={text => setEmail(text)}


          />
        </View>

        <View style={styles.input}>
          <TextInput
            placeholderTextColor='#D3D3D3'
            placeholder='Password'
            value={password}
            secureTextEntry={true}
            textContentType='password'
            onChangeText={text => setPassword(text)}

          />
        </View>

        {isSignedIn === true ?
          <Pressable
            onPress={LogoutUser}
            style={styles.login}
          >
            <Text style={[tw`font-bold text-center p-4 `, styles.login]}>
              Log Out
            </Text>
          </Pressable>
          :
          <Pressable
            onPress={LoginUser}
            style={styles.login}
          >
            <Text style={[tw`font-bold text-center p-4 `, styles.login]}>
              Log In
            </Text>
          </Pressable>
        }



        <View>
          <Text style={tw`p-4 ml-4`}>Or Login With</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
            <Image source={{ uri: 'https://i.imgur.com/oPhraRe.png' }}
              style={styles.google}
            />
          </View>

        </View>

        <View>
          <Text
            style={styles.signup}
          >
            I dont have an Account, </Text>
          <Text
            style={[tw`font-bold text-center p-4 `, styles.register]}
            onPress={RegisterUser}
          >
            SignUp
          </Text>
        </View>

        <View>
          <Text style={styles.terms}>By signing up, you agree to our Terms and Conditions.</Text>
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
    padding: 8,
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