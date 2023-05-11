import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SkeletonContent from "react-native-skeleton-content";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      setToken(token);
      await AsyncStorage.setItem("token", token);
      console.log("Token:", token);
      navigation.navigate("TabNavigator");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SkeletonContent
        isLoading={isLoading}
        boneColor="#E1E9EE"
        highlightColor="#F6F8FC"
        animationType="pulse"
        layout={[{ key: "form", width: "100%", flex: 1 }]}
      >
        <LoginForm navigation={navigation} onSubmit={login} />
      </SkeletonContent>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
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
    fontFamily: "PoppinsSemiBold",
    color: "#34779a",
    marginBottom: 30,
    marginLeft: 30,
    letterSpacing: -2,
  },
});
