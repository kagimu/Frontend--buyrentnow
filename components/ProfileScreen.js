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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { BASE_URL } from "@env";
import ImageList from "./ImageList";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
  " expo-app-loading is deprecated in favor of expo-splash-screen: use SplashScreen.preventAutoHideAsync() and SplashScreen.hideAsync() instead. https://docs.expo.dev/versions/latest/sdk/splash-screen/ ",
]);

const ProfileScreen = ({ navigation }) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const data = [{ key: "1" }];

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
      setProfilePicture(assets[0].uri);
      uploadProfilePicture(assets[0].uri);
    }
  };

  const uploadProfilePicture = async (uri) => {
    try {
      const formData = new FormData();
      formData.append("image", {
        uri,
      });

      const token = await AsyncStorage.getItem("token"); // Retrieve the token from AsyncStorage
      const response = await axios.post(`${BASE_URL}/api/profile/avatar`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "Application/json",
        }, // Set the Authorization header
      });

      console.log("Profile picture uploaded:", response.data);
    } catch (error) {
      console.log("Error uploading profile picture:", error.message);
    }
  };

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <View
          style={{
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
            {profilePicture ? (
              <Image
                source={{ uri: profilePicture }}
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

          <Text style={styles.text}>Martha Segawa</Text>

          <View>
            <Text style={styles.text1}>Saved</Text>
            <Text style={styles.text2}>
              Property listing you have saved over
            </Text>
          </View>

          <View style={{ top: 20 }}>
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
              onPress={() => navigation.navigate("AccountSettings")}
            >
              Account Settings
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
    fontSize: 20,
  },
  text1: {
    fontSize: 16,
    textAlign: "center",
    paddingTop: 20,
    fontFamily: "PoppinsSemiBold",
  },
  text2: {
    fontSize: 13,
    fontFamily: "Poppins",
    textAlign: "center",
    paddingTop: 2,
  },
});
