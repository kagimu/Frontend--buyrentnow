import React from "react";
import { Text } from "react-native";

import { Dimensions, TouchableOpacity } from "react-native";
import { StyleSheet, Image, Button } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

const { width } = Dimensions.get("window");

const Next = ({ ...props }) => (
  <TouchableOpacity {...props}>
    <Text
      style={{
        fontSize: 15,
        fontFamily: "PoppinsSemiBold",
        padding: 20,
        marginLeft: 20,
        borderRadius: 10,
      }}
    >
      Next
    </Text>
  </TouchableOpacity>
);

const Done = ({ ...props }) => (
  <TouchableOpacity {...props}>
    <Text
      style={{
        fontSize: 15,
        fontFamily: "PoppinsSemiBold",
        padding: 20,
        borderRadius: 10,
        marginLeft: 20,
        backgroundColor: "#fff",
      }}
    >
      Done
    </Text>
  </TouchableOpacity>
);

const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      bottomBarColor="#fff"
      titleStyles={{ fontFamily: "PoppinsSemiBold", fontSize: 22 }}
      subTitleStyles={{ fontFamily: "Poppins", fontSize: 15 }}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      onSkip={() => navigation.replace("Login")}
      onDone={() => navigation.navigate("Login")}
      containerStyles={{ backgroundColor: "white" }}
      pages={[
        {
          backgroundColor: "#fff",
          fontFamily: "PoppinsSemiBold",
          image: (
            <Image
              source={{ uri: "https://i.imgur.com/X09Z052.png" }}
              style={styles.image}
            />
          ),
          title: "Am Looking for Plot of Land",
          subtitle:
            "Explore the latest properties, Checkout new properties, land, apartments and Houses.",
          bottomBarColor: "#fff",
        },
        {
          backgroundColor: "#fff",
          fontFamily: "PoppinsSemiBold",
          image: (
            <Image
              source={{ uri: "https://i.imgur.com/MFfKMZ3.png" }}
              style={styles.image}
            />
          ),
          title: "I want to own a house",
          subtitle:
            "Explore the latest properties, Checkout new properties, land, apartments and Houses.",
        },
        {
          backgroundColor: "#fff",
          fontFamily: "PoppinsSemiBold",
          image: (
            <Image
              source={{ uri: "https://i.imgur.com/7UnW4ai.png" }}
              style={styles.image}
            />
          ),
          title: "I want to buy a Mansion",
          subtitle:
            "Explore the latest properties, Checkout new properties, land, apartments and Houses.",
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  image: {
    height: Dimensions.get("window").height - 300,
    width: "100%",
    marginTop: -200,
    resizeMode: "contain",
    borderRadius: 10,
  },
});
