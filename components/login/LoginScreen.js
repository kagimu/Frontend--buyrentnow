import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [token, setToken] = useState("");

  const login = async (phone, password) => {
    if (!phone || !password) {
      alert("Please enter all the required fields");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: phone, password: password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const { token } = await response.json();
      setToken(token);
      await AsyncStorage.setItem("token", token);
      console.log("Token:", token);
      navigation.replace("TabNavigator");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <LoginForm navigation={navigation} onSubmit={login} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 20,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  text: {
    marginTop: 10,
    fontSize: 40,
    fontFamily: "PoppinsSemiBold",
    color: "#387981",
    marginBottom: 30,
    marginLeft: 30,
    letterSpacing: -2,
  },
});
