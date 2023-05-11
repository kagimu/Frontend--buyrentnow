import React from "react";
import { Text } from "react-native";

import { Dimensions, TouchableOpacity } from "react-native";
import { StyleSheet, Image, Button } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

const { width, height } = Dimensions.get("window");

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
      titleStyles={{
        fontFamily: "PoppinsExtraBold",
        fontSize: 24,
        marginTop: 20,
      }}
      imageContainerStyles={{
        paddingBottom: 0,
        paddingTop: 0,
        aspectRatio: 1 / 1,
        height: height * 0.6,
      }}
      subTitleStyles={{ fontFamily: "PoppinsSemiBold", fontSize: 12 }}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      onSkip={() => navigation.replace("Login")}
      onDone={() => navigation.navigate("Login")}
      containerStyles={{
        backgroundColor: "white",
        marginTop: -89,
      }}
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
          title: "Am Looking for a Rental",
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
          title: "I am looking for a Plot of land",
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
          title: "I want to sell my property",
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
    aspectRatio: 1 / 1,
    width: "100%",
    resizeMode: "contain",
    borderRadius: 10,
    marginTop: 20,
  },
});
