import { Button, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc';

const LoginForm = ({ signup, onSubmit }) => {


  screen = signup ? 'Home' : 'Login';
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState('');

  const handleRegister = () => {
    navigation.navigate('RegisterScreen')
  }

  return (
    <View>
      <View>
        <Text style={tw`font-bold p-2 ml-4 pb-4`}>Sign In</Text>

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

      <View>
        <TouchableOpacity
          disabled={!password || !phone}
          onPress={() => onSubmit(phone, password)}
          style={styles.login}
        >
          <Text style={[tw`font-bold text-center p-4 `, styles.login]}>
            Login
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={tw`p-4 ml-4`}>Or Login With</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
          <Image source={{ uri: 'https://i.imgur.com/oPhraRe.png' }}
            style={styles.google}
          />
        </View>
      </View>

      <Button
        title='Register Instead'
        variant="text"
        onPress={handleRegister}
      />
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