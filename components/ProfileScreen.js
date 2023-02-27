import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ImageList from './ImageList'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { pickImage, askForPermission, uploadImage } from "../utils";
import { auth, db } from "../database/Config";
import { updateProfile } from "@firebase/auth";
import { doc, setDoc } from "@firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [permissionStatus, setPermissionStatus] = useState(null);
    const navigation = useNavigation();
    useEffect(() => {
        (async () => {
            const status = await askForPermission();
            setPermissionStatus(status);
        })();
    }, []);

    async function handlePress() {
        const user = auth.currentUser;
        let photoURL;
        if (selectedImage) {
            const { url } = await uploadImage(
                selectedImage,
                `images/${user.uid}`,
                "profilePicture"
            );
            photoURL = url;
        }
        const userData = {

            email: user.email,
        };
        if (photoURL) {
            userData.photoURL = photoURL;
        }

        await Promise.all([
            updateProfile(user, userData),
            setDoc(doc(db, "users", user.uid), { ...userData, uid: user.uid }),
        ]);
        navigation.navigate("ProfileScreen");
    }

    async function handleProfilePicture() {
        const result = await pickImage();
        if (!result.cancelled) {
            setSelectedImage(result.uri);
            handlePress();
        }
    }

    if (!permissionStatus) {
        return <Text>Loading</Text>;
    }
    if (permissionStatus !== "granted") {
        return <Text>You need to allow this permission</Text>;
    }

    return (
        <React.Fragment>
            <StatusBar style="auto" />
            <View style={styles.container}
            >
                <View style={{
                    justifyContent: 'center',
                    alignContent: 'center',
                    marginLeft: 100,

                }}>
                    <TouchableOpacity
                        onPress={handleProfilePicture}
                        style={{
                            marginTop: 30,
                            borderRadius: 120,
                            width: 120,
                            height: 120,
                            backgroundColor: colors.background,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {!selectedImage ? (
                            <MaterialCommunityIcons
                                name="camera-plus"
                                color='#808080'
                                size={45}
                            />
                        ) : (
                            <Image
                                source={{ uri: selectedImage }}
                                style={{ width: "100%", height: "100%", borderRadius: 120 }}
                            />
                        )}
                    </TouchableOpacity>

                </View>

                <Text style={styles.text}>Martha Segawa</Text>

                <View>
                    <Text style={styles.text1}>Saved</Text>
                    <Text style={styles.text2}>Property listing you have saved over</Text>
                    <View style={{ marginLeft: 32, }}>
                        <ImageList />
                    </View>

                </View>

                <Text style={{
                    textAlign: 'center',
                    marginTop: 40,
                    fontSize: 16,
                    color: '#347794',
                    fontWeight: '800',
                }}
                    onPress={() => navigation.navigate('AccountSettings')}
                >Account Settings</Text>

            </View >
        </React.Fragment>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 0,
        marginTop: 10,
        justifyContent: 'center',
        alignContent: 'center',


    },
    text: {
        textAlign: 'center',
        paddingTop: 10,
        fontWeight: 'bold',
        fontSize: 20,
    },
    text1: {
        fontSize: 16,
        textAlign: 'center',
        paddingTop: 20,
        fontWeight: '700',
    },
    text2: {
        fontSize: 13,
        textAlign: 'center',
        paddingTop: 2,

    }
})