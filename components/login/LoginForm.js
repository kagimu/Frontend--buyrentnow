import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";

const LoginForm = ({ onSubmit }) => {
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [seePassword, setSeePassword] = useState(true);
  const navigation = useNavigation();
  const handleSignIn = () => {
    // Check if password or phone is empty
    if (!password || !phone) {
      Alert.alert("Error", "Please enter both phone number and password.");
      return;
    }

    // Check if the password is correct
    if (password !== "correctpassword") {
      Alert.alert("Error", "Wrong password. Please try again.");
      return;
    }

    // Check if the phone number is already taken
    if (phone === "alreadytaken") {
      Alert.alert("Error", "This phone number is already taken.");
      return;
    }

    // Call the onSubmit function passed as props with the phone and password
    onSubmit(phone, password);
  };

  return (
    <View>
      <View>
        <Text style={[styles.title, tw`p-8 pb-10`]}>Sign in</Text>

        <View style={styles.input}>
          <TextInput
            placeholderTextColor="#808080"
            style={{ fontSize: 16, fontFamily: "Poppins" }}
            placeholder="Phone number"
            value={phone}
            textContentType="phone"
            autoFocus={true}
            onChangeText={(text) => setPhone(text)}
          />
        </View>
      </View>

      <View style={styles.inputPassword}>
        <TextInput
          placeholderTextColor="#808080"
          style={{ fontSize: 16, fontFamily: "Poppins" }}
          placeholder="Password"
          value={password}
          secureTextEntry={seePassword}
          textContentType="password"
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          onPress={() => setSeePassword(!seePassword)}
          style={{
            position: "absolute",
            alignSelf: "center",
            left: 230,
            alignContent: "space-between",
          }}
        >
          {seePassword ? (
            <Ionicons name="ios-eye-off" size={21} color="#808080" />
          ) : (
            <Ionicons name="ios-eye" size={21} color="#808080" />
          )}
        </TouchableOpacity>
      </View>

      <View style={{ paddingTop: 15, paddingBottom: 35 }}>
        <TouchableOpacity
          disabled={!password || !phone}
          onPress={() => onSubmit(phone, password)}
          style={styles.login}
        >
          <Text style={styles.login}>Sign in</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          padding: 10,
          marginTop: 10,
          marginHorizontal: 20,
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 15, fontFamily: "Poppins" }}>
          If you don't have an account, register
        </Text>
      </View>

      <View>
        <TouchableOpacity
          onPress={() => {
            console.log("Navigating to RegisterScreen...");
            navigation.navigate("RegisterScreen");
          }}
          style={styles.register}
        >
          <Text style={{ fontFamily: "PoppinsSemiBold", fontSize: 15 }}>
            Create an account
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 12,
            color: "#808080",
            fontFamily: "Poppins",
            marginHorizontal: 30,
            paddingTop: 10,
          }}
        >
          By signing up, you agree to our terms and Conditions
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  instead: {
    borderColor: "#34779a",
    marginLeft: 30,
    backgroundColor: "#fff",
    fontFamily: "PoppinsSemiBold",
    marginHorizontal: 30,
    color: "#34779a",
  },
  line: {
    fontFamily: "PoppinsSemiBold",
  },
  title: {
    fontFamily: "PoppinsExtraBold",
    fontSize: 24,
  },
  input: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    backgroundColor: "white",
    marginHorizontal: 30,
    fontFamily: "Poppins",
  },
  inputPassword: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    borderRadius: 24,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    backgroundColor: "white",
    marginHorizontal: 30,
    fontFamily: "Poppins",
  },
  login: {
    marginHorizontal: 30,
    borderRadius: 24,
    padding: 11,
    backgroundColor: "#34779a",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "PoppinsExtraBold",
    fontSize: 17,
    marginTop: -8,
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
    paddingTop: 20,
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
    borderColor: "#E2E2E2",
    marginLeft: 30,
    backgroundColor: "#fff",
    fontFamily: "PoppinsSemiBold",
    borderWidth: 2,
    borderRadius: 16,
    marginHorizontal: 30,
    color: "#387981",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoginForm;
