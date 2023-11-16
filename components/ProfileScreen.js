import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { BASE_URL } from "@env";
import ImageList from "./ImageList";
import ImageList2 from "./ImageList2";
import { LogBox } from "react-native";
import { useEffect } from "react";

const { width, height } = Dimensions.get("window");

LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
  " expo-app-loading is deprecated in favor of expo-splash-screen: use SplashScreen.preventAutoHideAsync() and SplashScreen.hideAsync() instead. https://docs.expo.dev/versions/latest/sdk/splash-screen/ ",
]);

const ProfileScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "You need to grant camera roll permissions to upload an image."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const { assets } = result;
      setImage(assets[0].uri);
      uploadProfilePicture(result.uri);
      AsyncStorage.setItem("profileImage", result.uri); // Store the image URI in AsyncStorage
    }
  };

  const uploadProfilePicture = async (uri) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const formData = new FormData();
      formData.append("image", {
        uri: uri,
        type: "image/jpeg", // Modify the type according to your image format
        name: "profile_picture.jpg", // Provide a suitable file name
      });

      const response = await axios.post(
        `https://propatizadmin.com/api/profile/avatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Profile picture uploaded:", response.data);
    } catch (error) {
      console.log("Error uploading profile picture:", error.message);
    }
  };

  const getName = async () => {
    try {
      const token = await AsyncStorage.getItem("token"); // Retrieve the token from AsyncStorage
      const response = await fetch(`https://propatizadmin.com/api/profile`, {
        headers: { Authorization: `Bearer ${token}` }, // Set the Authorization header
      });

      if (!response.ok) {
        throw new Error("Request failed with status code " + response.status);
      }

      const name = await response.json();
      console.log("Data from API:", name);
      setName(name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const retrieveProfileImage = async () => {
      try {
        const storedImage = await AsyncStorage.getItem("profileImage");
        if (storedImage) {
          setImage(storedImage);
        }
      } catch (error) {
        console.log("Error retrieving profile image:", error.message);
      }
    };

    retrieveProfileImage();
    uploadProfilePicture();
    getName();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.centeredContainer}>
        <TouchableOpacity
          style={styles.profileImageContainer}
          onPress={handleImagePicker}
        >
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <Text style={styles.plusIcon}>+</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.text1}>
          {name.first_name} {name.last_name}
        </Text>

        <View
          style={{
            top: 30,
            left: 15,
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Text style={styles.text}>My properties</Text>
          <View style={styles.imageListContainer}>
            <ImageList2 />
          </View>

          <Text style={styles.text}>Saved listings</Text>
          <View style={styles.imageListContainer}>
            <ImageList />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 150,
  },
  centeredContainer: {
    flex: 1,
    marginTop: height * 0.05,
  },
  profileImageContainer: {
    left: width * 0.35,
    borderRadius: 100,
    width: 120,
    height: 120,
    backgroundColor: "white",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  plusIcon: {
    fontSize: 24,
    position: "absolute",
    left: width * 0.15,
    top: height * 0.06,
  },
  text: {
    marginLeft: width * 0.04,
    fontFamily: "Poppins",
    fontSize: 15,
    color: "#808080",
  },
  text1: {
    left: width * 0.35,
    fontFamily: "PoppinsSemiBold",
    fontSize: 17,
    top: height * 0.02,
    paddingBottom: height * 0.05,
  },
  imageListContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 30,
  },
});
