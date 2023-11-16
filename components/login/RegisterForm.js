import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
} from "react-native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";

const RegisterForm = ({ onSubmit }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(true);
  const [seePassword2, setSeePassword2] = useState(true);
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkValidEmail, setCheckValidEmail] = useState(false);

  const handleCheckEmail = (text) => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setEmail(text);
    if (re.test(text) || regex.test(text)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 200, backgroundColor: "#F6F8FC" }}
    >
      <View>
        <Text style={[styles.heading, tw`p-8 `]}>Create account</Text>

        <View style={styles.input}>
          <TextInput
            placeholderTextColor="#808080"
            style={{ fontSize: 17, fontFamily: "Poppins" }}
            placeholder="first Name"
            value={first_name}
            textContentType="text"
            autoFocus={true}
            onChangeText={(text) => setFirstName(text)}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            placeholderTextColor="#808080"
            style={{ fontSize: 17, fontFamily: "Poppins" }}
            placeholder="last Name"
            value={last_name}
            textContentType="text"
            autoFocus={true}
            onChangeText={(text) => setLastName(text)}
          />
        </View>

        <View style={styles.input}>
          <TextInput
            placeholderTextColor="#808080"
            style={{ fontSize: 17, fontFamily: "Poppins" }}
            placeholder="Email"
            value={email}
            textContentType="emailAddress"
            autoFocus={true}
            onChangeText={(text) => handleCheckEmail(text)}
          />
        </View>
        {checkValidEmail ? (
          <Text style={styles.textFailed}>Wrong email format</Text>
        ) : (
          <Text style={styles.textFailed}></Text>
        )}

        <View style={styles.input}>
          <TextInput
            placeholderTextColor="#808080"
            style={{ fontSize: 17, fontFamily: "Poppins" }}
            placeholder="Phone number"
            value={phone}
            textContentType="telephoneNumber"
            autoFocus={true}
            onChangeText={(text) => setPhone(text)}
          />
        </View>
      </View>

      <View style={styles.inputPassword}>
        <TextInput
          placeholderTextColor="#808080"
          style={{ fontSize: 17, fontFamily: "Poppins" }}
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
      <View style={styles.inputPassword}>
        <TextInput
          placeholderTextColor="#808080"
          style={{ fontSize: 17, fontFamily: "Poppins" }}
          placeholder="Confirm Password"
          value={confirmPassword}
          secureTextEntry={seePassword2}
          textContentType="password"
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <TouchableOpacity
          onPress={() => setSeePassword2(!seePassword2)}
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

      <View style={{ paddingTop: -30 }}>
        {checkValidEmail == true ? (
          <TouchableOpacity style={styles.loginDisable}>
            <Text style={styles.login}>Sign up</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            disabled={
              !first_name ||
              !last_name ||
              !email ||
              !phone ||
              !password ||
              !confirmPassword
            }
            onPress={() =>
              onSubmit(first_name, last_name, email, phone, password)
            }
            style={styles.login}
          >
            <Text style={styles.login}>Sign up</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  textFailed: {
    alignSelf: "flex-start",
    left: 40,
    color: "red",
    top: -10,
  },
  input: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    marginHorizontal: 30,
    backgroundColor: "white",
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
    padding: 10,
    backgroundColor: "#34779a",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    fontFamily: "PoppinsExtraBold",
    fontSize: 17,
  },
  loginDisable: {
    marginHorizontal: 30,
    padding: 10,
    backgroundColor: "#808080",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    fontFamily: "PoppinsExtraBold",
    fontSize: 17,
  },
  heading: { fontFamily: "PoppinsExtraBold", fontSize: 22 },
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
