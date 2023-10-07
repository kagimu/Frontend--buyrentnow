import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Alert,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { BackHandler } from "react-native";
import React, { useState, useEffect } from "react";
import * as MailComposer from "expo-mail-composer";
import tw from "twrnc";
import { Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Entypo } from "@expo/vector-icons";

const BookingConfirmation = ({ navigation }) => {
  const [type, setType] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [size, setSize] = useState("");
  const [status, setStatus] = useState("");
  const [host, setHost] = useState("");
  const [number, setNumber] = useState("");
  const [image, setImage] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      selectionLimit: 10,
      aspect: [9, 16],
      quality: 1.0,
      allowsMultipleSelection: true,
      //allowsEditing: true,
    });
    console.log(result);
    if (!result.canceled) {
      const selectedImages = result.assets.map((asset) => asset.uri);
      setImages(selectedImages);
    }
  };

  const [videoUri, setVideoUri] = useState(null);

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.cancelled) {
      setVideoUri(result.uri);
    }
  };

  const validateForm = () => {
    if (
      type.trim() === "" ||
      name.trim() === "" ||
      desc.trim() === "" ||
      price.trim() === "" ||
      location.trim() === "" ||
      size.trim() === "" ||
      status.trim() === "" ||
      host.trim() === "" ||
      number.trim() === ""
    ) {
      return false; // Return false if any required field is empty
    }
    return true; // Return true if all required fields are filled
  };

  const onSubmit = () => {
    if (!validateForm()) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    // Format the form data as a string
    const body = `Type of Property: ${type}\n\nProperty Name: ${name}\n\nDescription: ${desc}\n\nPrice: ${price}\n\nLocation: ${location}\n\nSize of Property: ${size}\n\nStatus: ${status}\n\nSender's Name: ${host}\n\nSender's Contact: ${number}\n\n`;

    // Create a mail object with the form data
    const mail = {
      recipients: ["propatiz9@gmail.com"], // Replace with your email address
      subject: "New Property Application For Propatiz",
      body: body,
      isHtml: false,
      attachments: [image], // Attach the image(s) here
    };

    // Send the email
    MailComposer.composeAsync(mail)
      .then(() => {
        // Reset the form data
        setType("");
        setName("");
        setDesc("");
        setPrice("");
        setLocation("");
        setSize("");
        setStatus("");
        setHost("");
        setNumber("");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Error", "There was an error sending your info.");
      });
    navigation.navigate("BookingAlert");
  };

  return (
    <ScrollView
      style={{ flex: 1, paddingBotton: 100, backgroundColor: "#f6f8fc" }}
    >
      <View style={{ paddingBottom: 80 }}>
        <Text style={styles.heading}>
          Lets help you market your property with ease
        </Text>
        <Text style={styles.subheading}>
          Share with us descriptions and images of your property and our
          assistant will reach out to you.
        </Text>

        <Text style={styles.label}>Type of Property</Text>
        <View style={styles.input1}>
          <Picker
            selectedValue={type}
            onValueChange={(itemValue) => setType(itemValue)}
          >
            <Picker.Item label="Land" value="land" style={styles.dropdown} />
            <Picker.Item
              label="Commercial"
              value="commercial"
              style={styles.dropdown}
            />
            <Picker.Item
              label="Residential"
              value="residential"
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
        <Text style={styles.label}>Price In Uganda Shillings</Text>
        <View style={styles.input}>
          <TextInput
            placeholderTextColor="#D3D3D3"
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
            onChangeText={(text) => setBedrooms(text)}
            value={bedrooms}
            multiline={true}
          />
        </View>

        {/* Number of Bathrooms */}
        <Text style={styles.label}>Number of Bathrooms</Text>
        <View style={styles.input}>
          <TextInput
            placeholderTextColor="#D3D3D3"
            onChangeText={(text) => setBathrooms(text)}
            value={bathrooms}
            multiline={true}
          />
        </View>
        <Text style={styles.label}>Size of Property</Text>
        <View style={styles.input}>
          <TextInput
            placeholderTextColor="#D3D3D3"
            onChangeText={(text) => setSize(text)}
            value={size}
            multiline={true}
          />
        </View>
        <Text style={styles.label}>Status</Text>
        <View style={styles.input1}>
          <Picker
            selectedValue={status}
            onValueChange={(itemValue) => setStatus(itemValue)}
            style={styles.dropdown}
          >
            <Picker.Item
              label="For Sale"
              value="For Sale"
              style={styles.dropdown}
            />
            <Picker.Item
              label="For Rent"
              value="For Rent"
              style={styles.dropdown}
            />
          </Picker>
        </View>
        <Text style={styles.label}>Your Name</Text>
        <View style={styles.input}>
          <TextInput
            placeholder="Your Full Name"
            placeholderTextColor="#D3D3D3"
            onChangeText={(text) => setHost(text)}
            value={host}
            multiline={true}
          />
        </View>
        <Text style={styles.label}>Your Contact Number</Text>
        <View style={styles.input}>
          <TextInput
            placeholder="0758000111/0777000111"
            placeholderTextColor="#D3D3D3"
            onChangeText={(text) => setNumber(text)}
            value={number}
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
          <Entypo
            name="upload"
            size={26}
            color="black"
            onPress={pickImage}
            style={{ paddingBottom: 10 }}
          />
          {image && (
            <Image
              source={{ uri: image }}
              style={{
                width: 70,
                height: 70,
                paddingTop: 30,
                paddingBottom: 0,
                borderRadius: 10,
              }}
            />
          )}
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
            onPress={pickImage}
            style={{ paddingBottom: 10 }}
          />
          {videoUri && (
            <Text>Selected Video: {videoUri}</Text>
            // You can display the video URI or a video player here
          )}
        </View>
        <View
          style={{
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
            Upload your Profile Picture
          </Text>
          <View
            style={{
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
              onPress={pickImage}
              style={{ paddingBottom: 10 }}
            />
            {profilePicture && (
              <Image
                source={{ uri: profilePicture }}
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

        <View style={{ marginHorizontal: 70, top: 20 }}>
          <TouchableOpacity
            onPress={onSubmit}
            style={{
              backgroundColor: "#fff",
              borderRadius: 8,
              padding: 10,
              marginTop: 20,
              marginBottom: 18,
              borderWidth: 2,
              borderColor: "#fff",
              elevation: 1,
              opacity: formValid ? 1 : 0.5, // Disable the button if the form is not valid
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
