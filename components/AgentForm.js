import {
  ActivityIndicator,
  Button,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import * as MailComposer from "expo-mail-composer";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "@env";
import Checkbox from "expo-checkbox";

import Form from "./TopTabs/Form";

const AgentForm = ({ route }) => {
  const { post } = route.params;
  const navigation = useNavigation();
  const [selectedChoice, setSelectedChoice] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const MAX_LINE_LENGTH = 25;
  const nameLines =
    post.name.match(new RegExp(`.{1,${MAX_LINE_LENGTH}}`, "g")) || [];

  const locationLines =
    post.location.match(new RegExp(`.{1,${MAX_LINE_LENGTH}}`, "g")) || [];

  const onSubmit = () => {
    // Perform form validation
    const errors = {};

    if (name.trim() === "") {
      errors.name = "Name is required";
    }

    if (phone.trim() === "") {
      errors.phone = "Phone is required";
    }

    if (email.trim() === "") {
      errors.email = "Email is required";
    }

    if (Object.keys(errors).length > 0) {
      // Set the form errors and prevent form submission
      setFormErrors(errors);
      return;
    }

    // Format the form data as a string
    const body = `Way Of Contact:${selectedChoice}\n\nClient's Name: ${name}\n\nPhone Number: ${phone}\n\nEmail of Client: ${email}\n\nPost Name: ${
      post.name
    }\n\nPost Images: ${post.images.map(
      (image) => BASE_URL + image
    )}\n\nLocation: ${post.location}\n\nPrice of Property: ${post.price}\n\n`;

    //Create a mail object with the form data
    const mail = {
      recipients: ["propatiz9@gmail.com"], // Replace with your email address
      subject: "New Client to Visit Property below",
      body: body,
      isHtml: false, // Set this option to true
    };

    // Send the email

    MailComposer.composeAsync(mail)
      // Reset the form data
      .then(() => {
        setName("");
        setPhone("");
        setEmail("");
      })

      .catch((error) => {
        console.log(error);
        Alert.alert("Error", "There was an error sending your info.");
      });
    navigation.navigate("EmailAlert", { pic: post });
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 0, backgroundColor: "#fff" }}
    >
      <View style={{ marginTop: 25 }}>
        <FlatList
          data={[post]}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.card, tw``]}>
              <View>
                <Image
                  style={styles.image}
                  source={{ uri: `${BASE_URL}${post.images[0]}` }}
                />
              </View>
              <View
                styles={{
                  flexDirection: "row",
                }}
              >
                <Text style={[styles.name, tw``]}>{nameLines.join("\n")}</Text>

                <Text style={[styles.row, tw``]} numberOfLines={3}>
                  {locationLines.join("\n")}
                </Text>
                <Text
                  style={{
                    fontFamily: "PoppinsSemiBold",
                    fontSize: 15,
                    marginLeft: 15,
                    marginTop: 10,
                  }}
                >
                  {post.price}
                </Text>
              </View>
            </View>
          )}
        />
      </View>

      <View style={styles.container}>
        <Text
          style={{
            fontSize: 22,
            textAlign: "left",
            fontFamily: "PoppinsExtraBold",
            padding: 10,
            marginLeft: 8,
            marginTop: 20,
          }}
        >
          How can we reach you?
        </Text>

        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              backgroundColor: "#f6f8fc",
              marginHorizontal: 25,
              borderRadius: 10,
            }}
          >
            <View style={styles.section}>
              <Checkbox
                style={styles.checkbox}
                value={selectedChoice === "call"}
                onValueChange={() => setSelectedChoice("call")}
                color={selectedChoice === "call" ? "#34779a" : undefined}
              />
              <Text style={styles.paragraph}>Call me</Text>
            </View>
            <View style={styles.section}>
              <Checkbox
                style={styles.checkbox}
                value={selectedChoice === "text"}
                onValueChange={() => setSelectedChoice("text")}
                color={selectedChoice === "text" ? "#34779a" : undefined}
              />
              <Text style={styles.paragraph}>Text me</Text>
            </View>
          </View>

          <Text style={styles.label}>Name</Text>
          <View style={styles.input3}>
            <TextInput
              placeholderTextColor="#808080"
              onChangeText={(text) => setName(text)}
              value={name}
              multiline={true}
            />
          </View>
          {formErrors.name && (
            <Text style={styles.error}>{formErrors.name}</Text>
          )}

          <Text style={styles.label}>Phone</Text>
          <View style={styles.input3}>
            <TextInput
              placeholderTextColor="#808080"
              onChangeText={(text) => setPhone(text)}
              value={phone}
              multiline={true}
            />
          </View>
          {formErrors.phone && (
            <Text style={styles.error}>{formErrors.phone}</Text>
          )}

          <Text style={styles.label}>Email</Text>
          <View style={styles.input3}>
            <TextInput
              placeholderTextColor="#808080"
              onChangeText={(text) => setEmail(text)}
              value={email}
              multiline={true}
            />
          </View>
          {formErrors.email && (
            <Text style={styles.error}>{formErrors.email}</Text>
          )}

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
                backgroundColor: "#34779a",
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
      </View>
    </ScrollView>
  );
};

export default AgentForm;

const styles = StyleSheet.create({
  error: {
    color: "red",
    marginLeft: 20,
    marginTop: -10,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    marginLeft: 50,
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
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
    borderColor: "#808080",
    marginHorizontal: 30,
    fontFamily: "Poppins",
    backgroundColor: "#fff",
  },
  label: {
    fontFamily: "PoppinsSemiBold",
    paddingLeft: 20,
  },
  row: {
    fontFamily: "Poppins",
    fontSize: 14,
    color: "#808080",
    marginLeft: 15,
  },
  card: {
    flexDirection: "row",
    padding: 10,
  },
  image: { width: 140, height: 100, resizeMode: "cover", borderRadius: 10 },
  container: {
    width: "100%",
    height: 600,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  name: {
    fontSize: 14,
    fontFamily: "Poppins",
    marginTop: 0,
    marginLeft: 15,
    color: "#808080",
  },
  phone: {
    fontSize: 15,
    fontFamily: "Poppins",
  },
});
