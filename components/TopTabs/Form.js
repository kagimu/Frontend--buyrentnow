import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import * as MailComposer from "expo-mail-composer";
import { useState } from "react";
import tw from "twrnc";

const Form = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = () => {
    // Format the form data as a string
    const body = `Property Name: ${name}\n\nDescription: ${phone}\n\nPrice: ${email}\n\n`;

    // Create a mail object with the form data
    const mail = {
      recipients: ["kagimujayp01@gmail.com"], // Replace with your email address
      subject: "New Property Listing For Propatiz",
      body: body,
      isHtml: false,
    };

    // Send the email
    MailComposer.composeAsync(mail)
      .then(() => {
        // Reset the form data
        setName("");
        setPhone("");
        setEmail("");

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
    <View style={{ flex: 1 }}>
      <Text style={styles.label}>Name</Text>
      <View style={styles.input3}>
        <TextInput
          placeholderTextColor="#D3D3D3"
          onChangeText={(text) => setName(text)}
          value={name}
          multiline={true}
        />
      </View>
      <Text style={styles.label}>Phone</Text>
      <View style={styles.input3}>
        <TextInput
          placeholderTextColor="#D3D3D3"
          onChangeText={(text) => setPhone(text)}
          value={phone}
          multiline={true}
        />
      </View>
      <Text style={styles.label}>Email</Text>
      <View style={styles.input3}>
        <TextInput
          placeholderTextColor="#D3D3D3"
          onChangeText={(text) => setEmail(text)}
          value={email}
          multiline={true}
        />
      </View>

      <View
        style={{
          alignContent: "center",
          justifyContent: "center",
          marginBottom: 100,
          paddingTop: 30,
        }}
      >
        <TouchableOpacity
          onPress={onSubmit}
          style={{
            backgroundColor: "#387981",
            padding: 15,
            borderRadius: 10,
            alignContent: "center",
            justifyContent: "center",
            marginHorizontal: 20,
          }}
        >
          <Text style={[tw` text-center `, styles.register]}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  register: {
    fontSize: 15,
    fontFamily: "PoppinsSemiBold",
    color: "#fff",
  },
  input3: {
    borderRadius: 8,
    padding: 10,
    marginTop: 0,
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
});
