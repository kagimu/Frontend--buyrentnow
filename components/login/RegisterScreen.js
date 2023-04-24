import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RegisterForm from "./RegisterForm";
import { BASE_URL } from "@env";
import axios from "axios";
import { getToken } from "./token";

const RegisterScreen = ({ navigation }) => {
  const register = async (first_name, last_name, email, phone, password) => {
    const token = await getToken();

    if (!phone && !password) alert("please enter all the required fields");
    else {
      axios
        .post(
          `${BASE_URL}/api/register`,
          {
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone: phone,
            password: password,
          },
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`, // auth token
            },
          },
          {
            validateStatus: function (status) {
              return status < 500; // Resolve only if the status code is less than 500
            },
          }
        )
        .then((response) => {
          console.log("getting data from axios", response.data);
          navigation.replace("TabNavigator");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <RegisterForm navigation={navigation} signup={true} onSubmit={register} />
    </View>
  );
};

export default RegisterScreen;

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
    fontWeight: "900",
    color: "#387981",
    marginBottom: 30,
    marginLeft: 30,
    letterSpacing: -2,
  },
});
