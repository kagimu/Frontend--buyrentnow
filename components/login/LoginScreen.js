import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");

  const login = async (phone, password) => {
    if (!phone || !password) {
      alert("Please enter all the required fields");
      return;
    }

    try {
      setIsLoading(true);
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
      Alert.alert("Welcome", "Login successful");
      setToken(token);
      await AsyncStorage.setItem("keepLoggedIn", JSON.stringify(true));
      await AsyncStorage.setItem("token", token);
      console.log("Token:", token);
      navigation.navigate("TabNavigator");
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        "Login failed. Wrong Phone Number or password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LoginForm navigation={navigation} onSubmit={login} />
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#34779a" />
        </View>
      )}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#F6F8FC",
    paddingTop: 30,
    paddingHorizontal: 12,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
