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
import Form from "./TopTabs/Form";

const AgentForm = ({ route }) => {
  const { post } = route.params;
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const MAX_LINE_LENGTH = 25;
  const nameLines =
    post.name.match(new RegExp(`.{1,${MAX_LINE_LENGTH}}`, "g")) || [];

  const locationLines =
    post.location.match(new RegExp(`.{1,${MAX_LINE_LENGTH}}`, "g")) || [];

  const onSubmit = () => {
    // Format the form data as a string
    const body = `Property Name: ${name}\n\nDescription: ${phone}\n\nPrice: ${email}\n\nPost Name: ${
      post.name
    }\n\nPost Images: ${post.images.join(",")}\n\nLocation: ${
      post.location
    }\n\nPrice: ${post.price}\n\n`;

    // Create a mail object with the form data
    const mail = {
      recipients: ["kagimujayp01@gmail.com"], // Replace with your email address
      subject: "Need of Services for Property below",
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
          "Your Property has been sent successfully To our Property Agents. We shall get back to you in 30 minutes",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("EmailAlert", { post: pic }), // Replace with your home screen name
            },
          ]
        );
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Error", "There was an error sending your info.");
      });
    navigation.navigate("EmailAlert", { pic: post });
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 0 }}>
      <View style={{ marginTop: 25 }}>
        <FlatList
          data={[post]}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.card, tw``]}>
              <View style={{}}>
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
      </View>
    </ScrollView>
  );
};

export default AgentForm;

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
