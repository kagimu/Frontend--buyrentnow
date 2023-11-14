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
  const data = [{ key: "2" }];

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
        `${BASE_URL}/api/profile/avatar`,
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
      const response = await fetch(
        `https://68f0-41-210-143-73.ngrok-free.app/api/profile`,
        {
          headers: { Authorization: `Bearer ${token}` }, // Set the Authorization header
        }
      );

      if (!response.ok) {
        throw new Error("Request failed with status code " + response.status);
      }

      const name = await response.json();
      console.log("Data from API:", name); // log data to the console
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
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <View
          style={{
            flex: 1,
            marginTop: height * 0.38,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              marginTop: 30,
              borderRadius: 120,
              width: 120,
              height: 120,
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={handleImagePicker}
          >
            {image ? (
              <Image
                source={{ uri: image }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 100,
                  alignContent: "center",
                  justifyContent: "center",
                  marginLeft: 10,
                }}
              />
            ) : (
              <Text style={{ fontSize: 24 }}>+</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.text}>
            {name.first_name} {name.last_name}
          </Text>

          <View
            style={{
              flex: 1,
              alignContent: "center",
              justifyContent: "center",
              marginTop: height * 0.05,
              marginBottom: height * 0.05,
            }}
          >
            <View style={{ top: 20, marginLeft: width * 0.06 }}>
              <Text style={styles.text2}>My properties</Text>
              <ImageList2 />
            </View>
          </View>

          <View style={{ marginLeft: width * 0.06 }}>
            <Text style={styles.text2}>Saved listings</Text>
            <ImageList />
          </View>

          <View>
            <Text
              style={{
                textAlign: "center",
                marginTop: 40,
                fontSize: 16,
                color: "#347794",
                fontFamily: "PoppinsSemiBold",
              }}
              // onPress={() => navigation.navigate("AccountSettings")}
            >
              Propatiz
            </Text>
          </View>
        </View>
      )}
    />
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  otherImagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  otherImage: {
    height: 100,
    width: 140,
    resizeMode: "stretch",
    borderRadius: 15,
    marginLeft: 5,
    marginTop: 5,
  },
  container: {
    flex: 0,
    paddingBottom: 150,
    marginTop: 10,
    justifyContent: "center",
    alignContent: "center",
  },
  text: {
    textAlign: "center",
    paddingTop: 10,
    fontFamily: "PoppinsSemiBold",
    fontSize: 17,
  },
  text1: {
    fontSize: 14,
    textAlign: "center",
    paddingTop: 20,
    fontFamily: "PoppinsSemiBold",
  },
  text2: {
    fontSize: 15,
    fontFamily: "Poppins",
    alignContent: "flex-start",
    left: width * 0.04,
    paddingBottom: height * 0.01,
    paddingTop: 10,
  },
});
