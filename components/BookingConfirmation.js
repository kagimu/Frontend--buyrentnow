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
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import * as MailComposer from "expo-mail-composer";
import tw from "twrnc";

const BookingConfirmation = () => {
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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      selectionLimit: 10,
      //mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: false,
    });
    if (!result.canceled) {
      console.log(images);
      setImages(result.assets[0].uri);
    }
  };

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
          <TextInput
            placeholder="is it land, commercial or residential?"
            placeholderTextColor="#D3D3D3"
            onChangeText={(text) => setType(text)}
            value={type}
            multiline={true}
          />
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
          <TextInput
            placeholder="is it For Sale or For rent?"
            placeholderTextColor="#D3D3D3"
            onChangeText={(text) => setStatus(text)}
            value={status}
            multiline={true}
          />
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
        <Text style={styles.label}>
          Upload atleast 4 images showing your property
        </Text>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
          }}
        >
          <StatusBar hidden={true} />
          <TouchableOpacity>
            <Feather
              name="upload"
              size={40}
              color="black"
              onPress={pickImage}
            />
            {images && (
              <Image
                source={{ uri: images }}
                style={{ width: 100, height: 100 }}
              />
            )}
          </TouchableOpacity>
        </View>

        <View
          style={{
            alignContent: "center",
            justifyContent: "center",
            paddingLeft: 130,
            paddingTop: 30,
          }}
        >
          <TouchableOpacity
            onPress={onSubmit}
            style={{
              backgroundColor: "#387981",
              flex: 1,
              padding: 10,
              width: 100,
              height: 60,
              borderRadius: 20,
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <Text style={[tw` text-center `, styles.register]}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default BookingConfirmation;

const styles = StyleSheet.create({
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
    fontSize: 18,
    padding: 5,
    fontFamily: "PoppinsSemiBold",

    color: "#fff",
  },
});
