import { Button, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import { Formik } from 'formik'
import * as Yup from 'yup'
import validator from 'email-validator'
import { useNavigation } from '@react-navigation/native'

const SignupForm = () => {
    const navigation = useNavigation()

    const SignupFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        username: Yup.string().required().min(2, 'A username is required'),
        password: Yup.string()
            .required()
            .min(8, 'Your Password has to have atleast 8 characters'),
    })


    return (
        <View>
            <Formik
                initialValues={{ email: '', password: '', password: '' }}
                onSubmit={values => {
                    console.log(values)
                }}
                validationSchema={SignupFormSchema}
                validateOnMount={true}
            >
                {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
                    <>

                        <View>
                            <Text style={tw`font-bold p-4 ml-4`}>Sign Up</Text>

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
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                />
                            </View>

                            <View
                                style={styles.input}>
                                <TextInput
                                    placeholderTextColor='#D3D3D3'
                                    placeholder='username'
                                    autoCapitalize='none'
                                    keyboardType='default'
                                    textContentType='username'
                                    onChangeText={handleChange('username')}
                                    onBlur={handleBlur('username')}
                                    value={values.username}
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
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                />
                            </View>

                            <Pressable
                                onPress={handleSubmit}
                                disabled={!isValid}
                            >
                                <Text style={[tw`font-bold text-center p-4 `, styles.login(isValid)]}>
                                    SignUp
                                </Text>
                            </Pressable>


                            <View>
                                <Text style={tw`p-4 ml-4`}>Or SignUp With</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <Image source={{ uri: 'https://i.imgur.com/oPhraRe.png' }}
                                        style={styles.google}
                                    />

                                </View>

                            </View>

                            <View>
                                <Text
                                    style={styles.signup}
                                    onPress={() => navigation.goBack()}
                                >
                                    Already have an Account? LogIn?</Text>
                            </View>

                            <View>
                                <Text style={styles.terms}>Terms and Conditions</Text>
                            </View>

                        </View>
                    </>
                )}
            </Formik>

        </View>
    )
}

export default SignupForm

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
        marginBottom: 18,
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