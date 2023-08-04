import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
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
  const register = async (last_name, first_name, email, phone, password) => {
    if (!phone || !password || !first_name || !email) {
      alert("Please enter all the required fields");
      return;
    }

    try {
      setIsLoading(true);

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
        throw new Error("Registartion failed");
      }

      const { token } = await response.json();
      Alert.alert("Success", "Registration successful");
      setToken(token);
      await AsyncStorage.setItem("keepLoggedIn", JSON.stringify(true));
      await AsyncStorage.setItem("token", token);
      console.log("Token:", token);
      navigation.navigate("TabNavigator");
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        "Registration failed. Make sure you have internet and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
    //paddingBottom: 50,
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
    justifyContent: "center",
    alignItems: "center",
  },
});
