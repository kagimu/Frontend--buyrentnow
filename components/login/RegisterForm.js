import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import React, { useEffect, useState } from "react";
import tw from "twrnc";

const RegisterForm = ({ onSubmit }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");

  return (
    <View>
      <View>
        <Text style={[styles.heading, tw`p-10 ml--2 pb-10`]}>Sign up</Text>

        <View style={styles.input}>
          <TextInput
            placeholderTextColor="#808080"
            placeholder="FirstName"
            value={first_name}
            textContentType="text"
            autoFocus={true}
            onChangeText={(text) => setFirst_name(text)}
          />
        </View>

        <View style={styles.input}>
          <TextInput
            placeholderTextColor="#808080"
            placeholder="LastName"
            value={last_name}
            textContentType="text"
            autoFocus={true}
            onChangeText={(text) => setLast_name(text)}
          />
        </View>

        <View style={styles.input}>
          <TextInput
            placeholderTextColor="#808080"
            placeholder="Email"
            value={email}
            textContentType="email"
            autoFocus={true}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.input}>
          <TextInput
            placeholderTextColor="#808080"
            placeholder="phonenumber"
            value={phone}
            textContentType="number"
            autoFocus={true}
            onChangeText={(text) => setPhone(text)}
          />
        </View>
      </View>

      <View style={styles.input}>
        <TextInput
          placeholderTextColor="#808080"
          placeholder="Password"
          value={password}
          secureTextEntry={true}
          textContentType="password"
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <View style={{ paddingTop: 15, paddingBottom: 15 }}>
        <TouchableOpacity
          onPress={() =>
            onSubmit(first_name, last_name, email, phone, password)
          }
          style={styles.login}
        >
          <Text style={styles.login}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  input: {
    borderRadius: 16,
    padding: 10,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#34779a",
    marginHorizontal: 30,
    backgroundColor: "white",
  },
  login: {
    marginHorizontal: 30,
    padding: 10,
    backgroundColor: "#34779a",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    fontFamily: "PoppinsSemiBold",
  },
  heading: { fontFamily: "PoppinsSemiBold", fontSize: 20 },
  google: {
    height: 40,
    width: 40,
    marginLeft: 30,
    marginBottom: 20,
  },
  signup: {
    color: "#34779a",
    marginLeft: 30,
    fontSize: 14,
    marginBottom: 2,
  },
  terms: {
    marginLeft: 30,
    marginTop: 10,
    color: "#444",
    fontSize: 13,
  },
  register: {
    padding: 10,
    borderColor: "#34779a",
    marginLeft: 30,
    backgroundColor: "#fff",
    fontFamily: "PoppinsSemiBold",
    borderWidth: 2,
    borderRadius: 8,
    marginHorizontal: 30,
    color: "#34779a",
    alignItems: "center",
    justifyContent: "center",
  },
});
