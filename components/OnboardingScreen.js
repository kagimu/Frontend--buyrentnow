import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import * as Font from "expo-font";
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
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
        PoppinsExtraBold: require("../assets/fonts/Poppins-ExtraBold.ttf"),
        PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
      });
      setFontLoaded(true);
    };

    loadFont();
  }, []);

  if (!fontLoaded) {
    return null; // Render a loading state or splash screen until the font is loaded
  }
  return (
    <Onboarding
      bottomBarColor="#fff"
      titleStyles={{
        fontFamily: "PoppinsExtraBold",
        marginTop: 10,
        fontSize: 25,
        marginTop: 30,
        textAlign: "left",
        marginHorizontal: 5,
      }}
      imageContainerStyles={{
        //flex: 1,
        resizeMode: "contain",
        paddingBottom: 10,
        paddingTop: 0,
        aspectRatio: 1 / 1,
        height: height * 0.7,
      }}
      subTitleStyles={{
        fontFamily: "PoppinsSemiBold",
        fontSize: 15,
        textAlign: "left",
        marginHorizontal: 0,
        position: "absolute",
        top: -15,
        left: -148,
      }}
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
          title: "",
          subtitle:
            "Empowering you to find your dream home or perfect rental with ease.",
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
          title: "",
          subtitle:
            "No more waiting for agents; take control of your rental search.",
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
          title: "",
          subtitle:
            "List your property hustle-free and directly connect with potential buyers and renters.",
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
