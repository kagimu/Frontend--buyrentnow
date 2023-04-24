import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";

const LoginForm = ({ onSubmit }) => {
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigation = useNavigation();
  return (
    <View>
      <View>
        <Text style={[styles.title, tw`p-10 ml--2 pb-10 text-lg`]}>
          Sign In
        </Text>

        <View style={styles.input}>
          <TextInput
            placeholderTextColor="#D3D3D3"
            placeholder="phonenumber"
            value={phone}
            textContentType="phone"
            autoFocus={true}
            onChangeText={(text) => setPhone(text)}
          />
        </View>
      </View>

      <View style={styles.input}>
        <TextInput
          placeholderTextColor="#D3D3D3"
          placeholder="Password"
          value={password}
          secureTextEntry={true}
          textContentType="password"
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <View style={{ paddingTop: 15, paddingBottom: 15 }}>
        <TouchableOpacity
          disabled={!password || !phone}
          onPress={() => onSubmit(phone, password)}
          style={styles.login}
        >
          <Text style={styles.login}>LOGIN</Text>
        </TouchableOpacity>
      </View>

      <View>
        <View>
          <Text style={[styles.line, tw`p-4 ml-4`]}>
            Or Login With Your Google Account
          </Text>
          <TouchableOpacity
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Image
              source={{ uri: "https://i.imgur.com/oPhraRe.png" }}
              style={styles.google}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ paddingTop: 10 }}>
        <TouchableOpacity style={styles.register}>
          <Text
            styles={styles.instead}
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            Register Instead
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  instead: {
    borderColor: "#387981",
    marginLeft: 30,
    backgroundColor: "#fff",
    fontFamily: "PoppinsSemiBold",
    marginHorizontal: 30,
    color: "#387981",
  },
  line: {
    fontFamily: "PoppinsSemiBold",
  },
  title: {
    fontFamily: "PoppinsSemiBold",
  },
  input: {
    borderRadius: 8,
    padding: 10,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#387981",
    marginHorizontal: 30,
    fontFamily: "Poppins",
  },
  login: {
    marginHorizontal: 30,
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#387981",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "PoppinsSemiBold",
    borderRadius: 10,
    fontSize: 18,
  },
  google: {
    height: 40,
    width: 40,
    marginLeft: 30,
    marginBottom: 20,
  },
  signup: {
    color: "#6BB0F5",
    marginLeft: 30,
    fontSize: 14,
    marginBottom: 2,
    fontFamily: "Poppins",
  },
  terms: {
    marginLeft: 30,
    marginTop: 10,
    color: "#444",
    fontSize: 13,
    fontFamily: "Poppins",
  },
  register: {
    padding: 10,
    borderColor: "#387981",
    marginLeft: 30,
    backgroundColor: "#fff",
    fontFamily: "PoppinsSemiBold",
    borderWidth: 2,
    borderRadius: 8,
    marginHorizontal: 30,
    color: "#387981",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoginForm;
