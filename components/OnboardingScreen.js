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
      imageContainerStyles={{
        flex: 1,
        resizeMode: "contain",
        aspectRatio: 1 / 1,
      }}
      subTitleStyles={{
        fontFamily: "PoppinsSemiBold",
        fontSize: width * 0.06,
        top: 30,
        textAlign: "center",
        marginHorizontal: 0,
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
            <Image source={require("../assets/01.png")} style={styles.image} />
          ),
          title: "",
          subtitle:
            "Empowering you to find\n your dream home or\n perfect rental with ease.",
          bottomBarColor: "#fff",
        },
        {
          backgroundColor: "#fff",
          fontFamily: "PoppinsSemiBold",
          image: (
            <Image source={require("../assets/02.png")} style={styles.image} />
          ),
          title: "",
          subtitle:
            "No more waiting for\n agents; take control\n of your rental search.",
        },
        {
          backgroundColor: "#fff",
          fontFamily: "PoppinsSemiBold",
          image: (
            <Image source={require("../assets/03.png")} style={styles.image} />
          ),
          title: "",
          subtitle:
            "List your property\n hustle-free and\n directly connect with potential buyers and renters.",
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  image: {
    width: "70%",
    resizeMode: "contain",
    borderRadius: 10,
    marginTop: 20,
  },
});
