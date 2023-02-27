import { Button, Image, ScrollView, StyleSheet, Text, TextInput, View, Platform, TouchableOpacity, Pressable, ActivityIndicator, Alert } from 'react-native'
import React, { useState, } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { firebase } from '../database/Config';
import firestore from '@react-native-firebase/firestore';
import tw from 'twrnc'



const BookingConfirmation = () => {

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false)




    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            allowsEditing: true
        });
        if (!result.canceled) {
            console.log(image)
            setImage(result.assets[0].uri);
        }
    };


    const uploadImage = async () => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function () {
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', image, true);
            xhr.send(null);
        })
        const ref = firebase.storage().ref().child(`Pictures/${filename}`)
        const snapshot = ref.put(blob)
        snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
            () => {
                setUploading(true)
            },
            (error) => {
                setUploading(false)
                console.log(error)
                blob.close()
                return
            },
            () => {
                snapshot.snapshot.ref.getDownloadURL().then((url) => {
                    setUploading(false)
                    console.log("Download URL: ", url)
                    setImage(url)
                    Alert.alert
                        (
                            'Your Info has been sent successfully'
                        )
                    blob.close()
                    return url
                })
            }
        )
    }

    const submitPost = async () => {
        const imageUrl = await uploadImage();

    }

    firestore()
        .collection('posts')
        .add({
            UserID: users.uid,
            property: property,
            category: category,
            description: description,
            image_2: image_2,
            location: location,
            main_image: imageUrl,
            price: price,
            quick_offer: null,
            saved: null,
            size: size,
            Status: Status,
            type: type,
        })
        .then(() => {
            console.log('Post added');
            setPost(null)
        })
        .catch((error) => {
            console.log('something went wrong with added post to firestore.', error);
        })

    return (
        <ScrollView style={{ flex: 1 }}>
            <View>
                <Text style={styles.heading}>Lets help you sell your property with ease</Text>
                <Text style={styles.subheading}>Share with us descriptions and images of your property and our agents will reach out to you.</Text>

                <Text style={styles.label}>Type of Property</Text>
                <View style={styles.input}>
                    <TextInput
                        placeholder='is it land, commercial or residential?'
                        placeholderTextColor='#D3D3D3'
                        onChangeText={(value) => handleChangeText("type", value)}


                        multiline={true}
                    />
                </View>

                <Text style={styles.label}>Property Name</Text>
                <View style={styles.input}>
                    <TextInput
                        placeholderTextColor='#D3D3D3'
                        onChangeText={(value) => handleChangeText("property", value)}

                        multiline={true}
                    />
                </View>
                <Text style={styles.label}>Description</Text>
                <View style={styles.input2}>
                    <TextInput
                        placeholderTextColor='#D3D3D3'
                        onChangeText={(value) => handleChangeText("description", value)}

                        multiline={true}
                    />
                </View>
                <Text style={styles.label}>Price</Text>
                <View style={styles.input}>
                    <TextInput
                        placeholderTextColor='#D3D3D3'
                        onChangeText={(value) => handleChangeText("price", value)}
                        multiline={true}
                    />
                </View>
                <Text style={styles.label}>Location</Text>
                <View style={styles.input}>
                    <TextInput
                        placeholderTextColor='#D3D3D3'
                        onChangeText={(value) => handleChangeText("location", value)}

                        multiline={true}
                    />
                </View>
                <Text style={styles.label}>Size of Property</Text>
                <View style={styles.input}>
                    <TextInput
                        placeholderTextColor='#D3D3D3'
                        onChangeText={(value) => handleChangeText("size", value)}


                        multiline={true}
                    />
                </View>
                <Text style={styles.label}>Status</Text>
                <View style={styles.input}>
                    <TextInput
                        placeholder='is it For Sale or For rent?'
                        placeholderTextColor='#D3D3D3'
                        onChangeText={(value) => handleChangeText("Status", value)}
                        multiline={true}
                    />
                </View>
                <Text style={styles.label}>Upload 4 images showing your property</Text>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10, }}>
                    <StatusBar hidden={true} />
                    <TouchableOpacity>
                        <Feather name="upload" size={40} color="black" onPress={pickImage} />
                        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                    </TouchableOpacity>
                    <StatusBar style="auto" />
                </View>

                {!uploading ? <TouchableOpacity onPress={uploadImage}>
                    <Text style={[tw`font-bold text-center p-4 `, styles.register]}>
                        Submit
                    </Text>
                </TouchableOpacity> : <ActivityIndicator size={'large'} color='black' />}

            </View>


        </ScrollView>
    )
}

export default BookingConfirmation

const styles = StyleSheet.create({
    input: {
        borderRadius: 8,
        padding: 10,
        marginTop: 20,
        marginLeft: 20,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: '#387981',
        marginHorizontal: 30,
    },
    input2: {
        borderRadius: 8,
        padding: 30,
        marginTop: 20,
        marginLeft: 20,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: '#387981',
        marginHorizontal: 30,
    },
    label: {
        fontWeight: 'bold',
        paddingLeft: 20,
    },
    heading: {
        fontSize: 25,
        fontWeight: 'bold',
        padding: 10,
        paddingLeft: 20,
    },
    subheading: {
        fontSize: 15,
        padding: 10,
        paddingTop: -10,
        marginBottom: 20,
        paddingLeft: 20,
    },
    register: {
        fontSize: 25,
        padding: 10,
        fontWeight: 'bolf'


    }
})