import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { BackHandler } from "react-native";
import React, { useState, useEffect } from "react";
import * as MailComposer from "expo-mail-composer";
import tw from "twrnc";

const BookingConfirmation = ({ navigation }) => {
  const [images, setImages] = useState(null);
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [size, setSize] = useState("");
  const [status, setStatus] = useState("");
  const [host, setHost] = useState("");
  const [number, setNumber] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        navigation.goBack(); // Navigate back when the back button is pressed
        return true; // Prevent default behavior
      }
    );
    return () => backHandler.remove(); // Cleanup subscription when component unmounts
  }, [navigation]);

  const pickImages = () => {};

  const onSubmit = () => {
    // Format the form data as a string
    const body = `Type of Property: ${type}\n\nProperty Name: ${name}\n\nDescription: ${desc}\n\nPrice: ${price}\n\nLocation: ${location}\n\nSize of Property: ${size}\n\nStatus: ${status}\n\nSender's Name: ${host}\n\nSender's Contact: ${number}\n\n`;

    // Create a mail object with the form data
    const mail = {
      recipients: ["kagimujayp01@gmail.com"], // Replace with your email address
      subject: "New Property Listing For LandVille",
      body: body,
      isHtml: false,
      attachments: [images], // Attach the image(s) here
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

        Alert.alert(
          "Success",
          "Your Property has been sent successfully To our Property Analysts. We shall get back to you as soon as possible for verification",
          [
            {
              text: "OK",
              onPress: () => navigation.back("HomeScreen"), // Replace with your home screen name
            },
          ]
        );
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Error", "There was an error sending your info.");
      });
  };

  return (
    <ScrollView style={{ flex: 1, paddingBotton: 100 }}>
      <View style={{ paddingBottom: 80 }}>
        <Text style={styles.heading}>
          Lets help you sell your property with ease
        </Text>
        <Text style={styles.subheading}>
          Share with us descriptions and images of your property and our agents
          will reach out to you.
        </Text>

        <Text style={styles.label}>Type of Property</Text>
        <View style={styles.input}>
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
        <Text style={styles.label}>Price</Text>
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
        <View style={styles.input}>
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
        <TouchableOpacity>
          <Text style={styles.label}>
            Upload at least 4 images showing your property
          </Text>
          {selectedImages.map((image) => (
            <Image
              key={image.uri}
              source={{ uri: image.uri }}
              style={{ width: 70, height: 70 }}
            />
          ))}
        </TouchableOpacity>

        <View
          style={{
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 30,
            paddingTop: 30,
          }}
        >
          <TouchableOpacity
            onPress={onSubmit}
            style={{
              backgroundColor: "#fff",
              borderRadius: 8,
              padding: 10,
              marginTop: 20,
              marginBottom: 18,
              borderWidth: 2,
              borderColor: "#000",
              marginHorizontal: 10,
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
  dropdown: { fontFamily: "Poppins", fontSize: 15 },
  input: {
    borderRadius: 8,
    padding: 10,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#387981",
    marginHorizontal: 30,
    fontFamily: "Poppins",
  },
  input2: {
    borderRadius: 8,
    padding: 30,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#387981",
    marginHorizontal: 30,
    fontFamily: "Poppins",
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
