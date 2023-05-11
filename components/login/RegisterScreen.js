import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import RegisterForm from "./RegisterForm";
import { BASE_URL } from "@env";
import axios from "axios";
import { getToken } from "./token";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const register = async (first_name, last_name, email, phone, password) => {
    if (!phone || !password || !first_name || !last_name) {
      alert("Please enter all the required fields");
      return;
    }

    try {
      setIsLoading(true); // set isLoading to true
      const response = await fetch(`${BASE_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: first_name,
          last_name: last_name,
          phone: phone,
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const { token } = await response.json();
      setToken(token);
      await AsyncStorage.setItem("token", token);
      console.log("Token:", token);
      navigation.navigate("TabNavigator");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // set isLoading to false after the request completes
    }
  };

  return (
    <ScrollView style={styles.container}>
      <RegisterForm navigation={navigation} onSubmit={register} />
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#34779a" />
        </View>
      )}
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FC",
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
    fontWeight: "900",
    color: "#387981",
    marginBottom: 30,
    marginLeft: 30,
    letterSpacing: -2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
