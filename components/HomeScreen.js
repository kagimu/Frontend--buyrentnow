import {
  BackHandler,
  Button,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import CardOptions from "./CardOptions";
import * as Font from "expo-font";
import tw from "twrnc";
import HomeCategories from "./HomeCategories";
import BuyHomeCategories from "./BuyHomeCategories";

const image = { uri: "https://i.imgur.com/78lC493.jpg" };
const { width, height } = Dimensions.get("window");
const aspectRatio = width / height;

const HomeScreen = ({ navigation }) => {
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("HomeScreen"); // Track current screen

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
        PoppinsExtraBold: require("../assets/fonts/Poppins-ExtraBold.ttf"),
        PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
      });
      setIsFontLoaded(true);
    };

    loadFont();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={[styles.container2, {}]}>
        <View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{}}
          >
            <View style={{ paddingLeft: 5, backgroundColor: "#F6F8FC" }}>
              <Image
                style={styles.image2}
                source={{ uri: "https://i.imgur.com/9IlSXeb.jpg" }}
              />
              <Text
                style={{
                  position: "absolute",
                  top: height * 0.13,
                  left: width * 0.07,
                  color: "#fff",
                  fontFamily: "PoppinsSemiBold",
                  fontSize: width * 0.043,
                }}
              >
                Simplifying your {"\n"}rental search
              </Text>
            </View>
            <View>
              <Image
                style={styles.image2}
                source={{ uri: "https://i.imgur.com/h3RheIY.jpg" }}
              />
              <Text
                style={{
                  position: "absolute",
                  top: height * 0.11,
                  left: width * 0.07,
                  color: "#fff",
                  fontFamily: "PoppinsSemiBold",
                  fontSize: width * 0.043,
                }}
              >
                Keep more in your {"\n"} pocket with our{"\n"} agent-free
                approach
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>

      <Text style={styles.text7}>
        Our marketplace helps you connect directly {"\n"}with property managers
        and owners with {"\n"}ease.
      </Text>

      <View
        style={{
          marginTop: 20,
          marginLeft: 5,
          backgroundColor: "#fff",
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          paddingTop: 12,
          paddingBottom: 10,
          alignContent: "center",
          position: "relative",
          width: "95.5%",
        }}
      >
        <Text
          style={{
            fontSize: 0.06 * width,
            marginBottom: 0,
            textAlign: "center",
            fontFamily: "PoppinsSemiBold",
          }}
        >
          Categories
        </Text>
        <HomeCategories />
      </View>

      <Text style={styles.textRecently}>Recently Added</Text>
      <Text style={styles.text3}>
        Find Recently listed Apartments, Houses and Commercial spaces.
      </Text>

      <View>
        <CardOptions />
      </View>

      <View style={{ paddingTop: 15, paddingBottom: 35 }}>
        <Text style={[styles.heading, tw` p-2`]}>
          Post your rental property
        </Text>
        <Text style={[styles.subheading, tw`text-center p-3`]}>
          Add your rental property and directly {"\n"}connect with potential
          renters
        </Text>

        <ImageBackground
          source={image}
          style={styles.image}
          imageStyle={{
            borderRadius: 10,
            width: "99%",
          }}
        >
          <Text
            style={[
              tw` text-center bg-blue-500 rounded-full mt-10`,
              styles.Button,
            ]}
            onPress={() => navigation.navigate("CallUs")}
          >
            Add property
          </Text>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  subtitleContainer: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 20,
    bottom: 0,
    padding: 10,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "PoppinsExtraBold",
    color: "#fff",
    textAlign: "left",
  },
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: "#F6F8FC",
    marginLeft: 10,
  },
  image: {
    width: width - 35,
    height: height * 0.3, // Adjust image height proportionally
    alignContent: "center",
    resizeMode: "contain",
    justifyContent: "center",
    marginBottom: 40,
    marginHorizontal: width - 350,
  },
  image2: {
    width: width - 35,
    height: height * 0.3, // Adjust image height proportionally
    alignContent: "center",
    resizeMode: "contain",
    justifyContent: "center",
    marginHorizontal: 5,
    backgroundColor: "#F6F8FC",
  },
  text: {
    fontSize: 25,
    fontFamily: "PoppinsSemiBold",
    marginTop: 40,
    color: "white",
    marginLeft: 30,
  },
  Button: {
    margin: width * 0.03,
    marginLeft: width * 0.2,
    marginRight: width * 0.155,
    backgroundColor: "#fff",
    color: "black",
    padding: height * 0.025,
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  text0: {
    fontSize: 0.04 * width,
    marginTop: 0,
    marginBottom: 10,
    marginLeft: 0.02 * width,
    textAlign: "left",
    fontFamily: "PoppinsSemiBold",
    color: "#121212",
  },
  text7: {
    fontSize: 0.04 * width,
    marginTop: -8,
    marginBottom: 10,
    marginLeft: 0.02 * width,
    textAlign: "left",
    fontFamily: "PoppinsSemiBold",
    color: "#121212",
  },
  text1: {
    fontSize: 0.06 * width, // Adjust font size based on screen width
    marginTop: 0.04 * height, // Adjust margin based on screen height
    marginLeft: 0.02 * width, // Adjust margin based on screen width
    fontFamily: "PoppinsSemiBold",
  },
  textRecently: {
    fontSize: 0.04 * width, // Adjust font size based on screen width
    marginTop: 0.04 * height, // Adjust margin based on screen height
    marginLeft: 0.02 * width, // Adjust margin based on screen width
    fontFamily: "PoppinsSemiBold",
  },
  text3: {
    fontSize: 0.03 * width,
    marginTop: -3,
    marginBottom: 10,
    marginLeft: 0.02 * width,
    fontFamily: "Poppins",
  },
  homeLower: {
    width: 320,
    height: 320,
    resizeMode: "contain",
    padding: 10,
    marginLeft: 35,
  },
  buttonLower: {
    backgroundColor: "#fff",
    borderColor: "#387981",
    borderWidth: 2,
    color: "#387981",
    marginBottom: 10,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 18,
    marginLeft: 15,
  },
  heading: {
    fontSize: 0.065 * width,
    textAlign: "center",
    textAlign: "center",
    fontFamily: "PoppinsSemiBold",
  },
  subheading: {
    fontSize: 0.035 * width,
    fontWeight: "200",
    textAlign: "center",
    marginTop: -20,
    textAlign: "center",
    fontFamily: "Poppins",
  },
});
