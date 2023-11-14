import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
  ActivityIndicator,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";
import { Picker } from "@react-native-picker/picker";
import React, { useState, useEffect } from "react";
import tw from "twrnc";
import { Entypo } from "@expo/vector-icons";
import { BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MultipleImages from "./MultipleImages";
import { post } from "../network/api";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import mime from "react-native-mime-types";

const BookingConfirmation = ({ navigation }) => {
  const [type, setType] = useState("Apartment");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [size, setSize] = useState("");
  const [owner, setOwner] = useState("");
  const [contact, setContact] = useState("");
  const [video, setVideo] = useState(null);
  const [profile_pic, setProfile_pic] = useState(null);
  const [formValid, setFormValid] = useState(false);
  const [images, setImages] = useState([]);
  const [category_id, setCategoryID] = useState(1); // Default to 1 for Apartment
  const [isLoading, setIsLoading] = useState(false); // Define isLoading state
  const [user_id, setUserId] = useState(null);

  const { width, height } = Dimensions.get("window");

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const handleError = (error) => {
    console.error("Error:", error);
    // Handle the error, show a message to the user, or perform other actions as needed.
  };

  const handleFilesUpload = async () => {
    try {
      const results = await DocumentPicker.getDocumentAsync({
        type: "image/*",
        multiple: true,
      });

      const files = [];
      for (const result of results.docs) {
        const fileUri = result.uri;
        const fileType = result.type;
        const fileContent = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const isImage = fileType && fileType.startsWith("image/");

        files.push({
          uri: fileUri,
          type: fileType,
          content: fileContent,
          isImage: isImage,
          isOnline: false,
        });
      }

      setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
      Alert.alert(
        "Information",
        "Before saving any uploaded files, make sure that you have uploaded the correct file. If it's not the intended file, you can click on the uploaded file to remove it before proceeding with the data-saving process."
      );
    } catch (err) {
      handleError(err);
    }
  };

  const handleImagesSelected = (images) => {
    setImages(images);
  };

  const handleTypeChange = (itemValue) => {
    setType(itemValue);

    // Set the corresponding category_id based on the selected type
    switch (itemValue) {
      case "Apartment":
        setCategoryID(1);
        break;
      case "House":
        setCategoryID(2);
        break;
      case "Commercial":
        setCategoryID(3);
        break;
      case "Land":
        setCategoryID(4);
        break;
      // Add more cases for other types and category_ids as needed
      default:
        setCategoryID(1); // Default to Apartment
    }
  };

  // After successful authentication, set the user ID

  const pickProfilePic = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
        setProfile_pic(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking profile pic:", error);
    }
  };

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setVideo(result.assets[0].uri);
    }
  };

  const submitForm = async () => {
    setIsLoading(true);

    const token = await AsyncStorage.getItem("token");
    const userString = await AsyncStorage.getItem("user");

    const user = JSON.parse(userString);
    const user_id = user ? user.id : null;

    const formData = new FormData();
    formData.append("status", "rental");
    formData.append("user_id", user_id);
    formData.append("category_id", category_id);
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("price", price);
    formData.append("location", location);
    formData.append("bedroom", bedroom);
    formData.append("bathroom", bathroom);
    formData.append("size", size);
    formData.append("owner", owner);
    formData.append("contact", contact);

    console.log("Type of images:", typeof images);
    console.log("Images:", images);

    for (let index = 0; index < images.length; index++) {
      const file = images[index];
      const fileInfo = await FileSystem.getInfoAsync(file.uri, {
        mimeType: "*",
      });

      const fileType =
        fileInfo.mimeType || mime.lookup(file.uri) || "image/jpeg"; // Default to JPEG if type is not recognized
      const fileObj = {
        uri: file.uri,
        type: fileType,
        name: `file_${index}.${fileType.split("/")[1] || "jpg"}`,
      };

      formData.append(`images[${index}]`, fileObj);
    }

    if (video) {
      formData.append("video", {
        uri: video,
        type: "video/mp4",
        name: "video.mp4",
      });
    }

    if (profile_pic) {
      formData.append("profile_pic", {
        uri: profile_pic,
        type: "image/jpeg",
        name: "profile_pic.jpg",
      });
    }
    try {
      const response = await post("/posts", formData, true);
      console.log(`API returned response: `, response);
      alert("Successful submission");
      navigation.navigate("TabNavigator");

      // Reset the form fields
      setType("");
      setCategoryID("");
      setName("");
      setDesc("");
      setPrice("");
      setLocation("");
      setBedroom("");
      setBathroom("");
      setSize("");
      setOwner("");
      setContact("");
      setVideo(null);
      setProfile_pic(null);
      setImages([]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
      console.log(`Request sent!`);
    }
  };

  const validateForm = () => {
    return (
      name.trim() !== "" &&
      desc.trim() !== "" &&
      price.trim() !== "" &&
      location.trim() !== "" &&
      bedroom.trim() !== "" &&
      bathroom.trim() !== "" &&
      owner.trim() !== "" &&
      contact.trim() !== ""
    );
  };

  return (
    <>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#34779a" />
        </View>
      ) : (
        <ScrollView
          style={{
            flex: 1,
            paddingBotton: height * 0.06,
            backgroundColor: "#f6f8fc",
          }}
        >
          <View
            style={{ paddingBottom: height * 0.2, marginTop: height * 0.06 }}
          >
            <Text style={styles.heading}>Post your rental property</Text>
            <Text style={styles.subheading}>
              Add your rental property and directly connect with potential
              renters
            </Text>

            <Text style={styles.label}>Type of Property</Text>
            <View style={styles.input1}>
              <Picker selectedValue={type} onValueChange={handleTypeChange}>
                <Picker.Item
                  label="Apartment"
                  value="Apartment"
                  style={styles.dropdown}
                />
                <Picker.Item
                  label="Commercial"
                  value="commercial"
                  style={styles.dropdown}
                />
                <Picker.Item
                  label="Land"
                  value="Land"
                  style={styles.dropdown}
                />
                <Picker.Item
                  label="House"
                  value="House"
                  style={styles.dropdown}
                />
              </Picker>
            </View>

            <Text style={styles.label}>Property Name</Text>
            <View style={styles.input}>
              <TextInput
                placeholderTextColor="#D3D3D3"
                onChangeText={(text) => setName(text)}
                value={name}
                multiline={true}
              />
            </View>
            <Text style={styles.label}>Description</Text>
            <View style={styles.input2}>
              <TextInput
                placeholderTextColor="#D3D3D3"
                onChangeText={(text) => setDesc(text)}
                value={desc}
                multiline={true}
              />
            </View>
            <Text style={styles.label}>Monthly rent In Ugandan Shillings</Text>
            <View style={styles.input}>
              <TextInput
                placeholderTextColor="#D3D3D3"
                placeholder="UGX"
                onChangeText={(text) => setPrice(text)}
                value={price}
                multiline={true}
              />
            </View>
            <Text style={styles.label}>Location</Text>
            <View style={styles.input}>
              <TextInput
                placeholderTextColor="#D3D3D3"
                onChangeText={(text) => setLocation(text)}
                value={location}
                multiline={true}
              />
            </View>
            {/* Number of Bedrooms */}
            <Text style={styles.label}>Number of Bedrooms</Text>
            <View style={styles.input}>
              <TextInput
                placeholderTextColor="#D3D3D3"
                onChangeText={(text) => setBedroom(text)}
                value={bedroom}
                multiline={true}
              />
            </View>

            {/* Number of Bathrooms */}
            <Text style={styles.label}>Number of Bathrooms</Text>
            <View style={styles.input}>
              <TextInput
                placeholderTextColor="#D3D3D3"
                onChangeText={(text) => setBathroom(text)}
                value={bathroom}
                multiline={true}
              />
            </View>
            <Text style={styles.label}>
              Size of Property Incase its Land (if its not, enter number "0")
            </Text>
            <View style={styles.input}>
              <TextInput
                placeholderTextColor="#D3D3D3"
                placeholder="0 square meters"
                onChangeText={(text) => setSize(text)}
                value={size}
                multiline={true}
              />
            </View>
            <Text style={styles.label}>Name of Landlord</Text>
            <View style={styles.input}>
              <TextInput
                placeholder="Your Full Name"
                placeholderTextColor="#D3D3D3"
                onChangeText={(text) => setOwner(text)}
                value={owner}
                multiline={true}
              />
            </View>
            <Text style={styles.label}>Contact of Landlord</Text>
            <View style={styles.input}>
              <TextInput
                placeholder="0758000111/0777000111"
                placeholderTextColor="#D3D3D3"
                onChangeText={(text) => setContact(text)}
                value={contact}
                multiline={true}
              />
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: 15,
                marginTop: 20,
                backgroundColor: "#fff",
                marginHorizontal: 20,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  fontFamily: "PoppinsSemiBold",
                  fontSize: 14,
                  paddingBottom: 10,
                  textAlign: "left",
                }}
              >
                Upload atleast 4 images showing your property
              </Text>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                  backgroundColor: "#fff",
                  marginHorizontal: 20,
                  borderRadius: 8,
                }}
              >
                <View>
                  <MultipleImages onImagesSelected={handleImagesSelected} />
                </View>
              </View>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: 15,
                marginTop: 20,
                backgroundColor: "#fff",
                marginHorizontal: 20,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  fontFamily: "PoppinsSemiBold",
                  fontSize: 14,
                  paddingBottom: 10,
                  textAlign: "left",
                }}
              >
                Select a Video showing the property:
              </Text>
              <Entypo
                name="upload"
                size={26}
                color="black"
                onPress={pickVideo}
                style={{ paddingBottom: 10 }}
              />
              {video && (
                <Video
                  source={{ uri: video }}
                  rate={1.0}
                  volume={1.0}
                  isMuted={false}
                  resizeMode="contain"
                  shouldPlay={false}
                  useNativeControls
                  style={{ width: 190, height: 140, borderRadius: 10 }}
                />
                // You can display the video URI or a video player here
              )}
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                top: 20,
                backgroundColor: "#fff",
                marginHorizontal: 20,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  fontFamily: "PoppinsSemiBold",
                  fontSize: 14,
                  paddingBottom: 10,
                  textAlign: "center",
                  marginTop: 10,
                }}
              >
                Upload Profile Picture of Landlord
              </Text>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                  backgroundColor: "#fff",
                  marginHorizontal: 20,
                  borderRadius: 8,
                }}
              >
                <Entypo
                  name="upload"
                  size={26}
                  color="black"
                  onPress={pickProfilePic}
                  style={{ paddingBottom: 10 }}
                />
                {profile_pic && (
                  <Image
                    source={{ uri: profile_pic }}
                    style={{
                      width: 70,
                      height: 70,
                      paddingTop: 5,
                      paddingBottom: 0,
                      borderRadius: 10,
                    }}
                  />
                )}
              </View>
            </View>

            <View style={{ marginHorizontal: width * 0.2, top: height * 0.04 }}>
              <TouchableOpacity
                onPress={async () => {
                  if (validateForm()) {
                    await submitForm(); // Call the submitForm function if the form is valid
                  } else {
                    alert("Please enter all required fields");
                  }
                }}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  padding: 10,
                  marginTop: 20,
                  marginBottom: 18,
                  borderWidth: 2,
                  borderColor: "#fff",
                  elevation: 1,
                  opacity: validateForm() ? 1 : 0.5, // Disable the button if the form is not valid
                  marginHorizontal: 0,
                }}
              >
                <Text style={[tw` text-center `, styles.register]}>
                  Add Property
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default BookingConfirmation;

const styles = StyleSheet.create({
  headAlert: {
    fontFamily: "PoppinsExtraBold",
    fontSize: "15",
  },
  alertMessage: {
    fontFamily: "Poppins",
    fontSize: 12,
  },
  dropdown: { fontFamily: "Poppins", fontSize: 15 },
  input: {
    borderRadius: 8,
    padding: 10,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#808080",
    marginHorizontal: 30,
    fontFamily: "Poppins",
    backgroundColor: "#fff",
  },
  input1: {
    borderRadius: 8,
    padding: 10,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#808080",
    marginHorizontal: 30,
    fontFamily: "Poppins",
    backgroundColor: "#f2f2f2",
  },
  input2: {
    borderRadius: 8,
    padding: 30,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#808080",
    marginHorizontal: 30,
    fontFamily: "Poppins",
    backgroundColor: "#fff",
  },
  label: {
    fontFamily: "PoppinsSemiBold",
    paddingLeft: 20,
  },
  heading: {
    fontSize: 25,
    fontFamily: "PoppinsExtraBold",
    paddingLeft: 20,
  },
  subheading: {
    fontFamily: "Poppins",
    fontSize: 13,
    padding: 10,
    paddingTop: -10,
    marginBottom: 20,
    paddingLeft: 20,
  },
  register: {
    fontSize: 14,
    padding: 5,
    fontFamily: "PoppinsSemiBold",
    color: "#000",
  },
});
