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
            <View style={{ paddingLeft: 5 }}>
              <Image
                style={styles.image2}
                source={{ uri: "https://i.imgur.com/9IlSXeb.jpg" }}
              />
              <Text
                style={{
                  position: "absolute",
                  top: 75,
                  left: 25,
                  color: "#fff",
                  fontFamily: "PoppinsExtraBold",
                  fontSize: 20,
                }}
              >
                Find the right {"\n"}buyers
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
                  top: 75,
                  left: 25,
                  color: "#fff",
                  fontFamily: "PoppinsExtraBold",
                  fontSize: 20,
                }}
              >
                Making Property {"\n"}Searching easy
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>

      <Text style={styles.text0}>
        The easiest way to buy, sell and rent {"\n"}real estate properties
      </Text>

      <View
        style={{
          marginTop: 20,
          backgroundColor: "#fff",
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          paddingTop: 12,
          paddingBottom: 10,
          marginLeft: 0,
          alignContent: "center",
          marginHorizontal: 0,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            marginBottom: 0,
            textAlign: "center",
            fontFamily: "PoppinsSemiBold",
          }}
        >
          Rent
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#58d2b5",
            position: "absolute",
            padding: 1.5,
            marginHorizontal: 166,
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            marginBottom: 10,
            top: 43,
            left: 8,
            width: 15,
            borderRadius: 2,
          }}
        ></TouchableOpacity>
        <HomeCategories />
      </View>

      <View
        style={{
          marginTop: 20,
          backgroundColor: "#fff",
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          marginHorizontal: 0,
          paddingTop: 12,
          paddingBottom: 10,
          marginLeft: 3,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            marginBottom: 5,
            textAlign: "center",
            fontFamily: "PoppinsSemiBold",
          }}
        >
          Buy
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#ffb18b",
            position: "absolute",
            padding: 1.5,
            marginHorizontal: 166,
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            marginBottom: 10,
            top: 43,
            left: 8,
            width: 15,
            borderRadius: 2,
          }}
        ></TouchableOpacity>
        <BuyHomeCategories />
      </View>

      <Text style={styles.text1}>Recently Added</Text>
      <Text style={styles.text3}>
        Find Recently added Apartments, Houses and lands.
      </Text>

      <View style={{ marginLeft: -5 }}>
        <CardOptions />
      </View>

      <View style={{ paddingTop: 30 }}>
        <Text style={[styles.heading, tw` p-2`]}>
          Are you renting or selling
        </Text>
        <Text style={[styles.subheading, tw`text-center p-3`]}>
          Lets help you sell your property with ease
        </Text>

        <ImageBackground
          source={image}
          style={styles.image}
          imageStyle={{ borderRadius: 10 }}
        >
          <Text
            style={[
              tw` text-center bg-blue-500 rounded-full mt-30`,
              styles.Button,
            ]}
            onPress={() => navigation.navigate("BookingConfirmation")}
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
    marginHorizontal: 0,
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
    marginBottom: 30,
  },
  image: {
    width: width - 22,
    height: 250,
    alignContent: "center",
    resizeMode: "stretch",
    justifyContent: "center",
    marginBottom: 40,
    marginHorizontal: 10,
    marginRight: 30,
  },
  image2: {
    width: width - 35,
    height: 200,
    alignContent: "center",
    resizeMode: "contain",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  text: {
    fontSize: 25,
    fontFamily: "PoppinsSemiBold",
    marginTop: 40,
    color: "white",
    marginLeft: 30,
    fontFamily: "PoppinsSemiBold",
  },
  Button: {
    margin: 10,
    marginLeft: 55,
    marginRight: 50,
    backgroundColor: "#fff",
    color: "black",
    padding: 12,
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  text0: {
    fontSize: 16,
    marginTop: 0,
    marginBottom: 10,
    marginLeft: 14,
    textAlign: "left",
    fontFamily: "PoppinsSemiBold",
    color: "#121212",
  },
  text1: {
    fontSize: 20,
    marginTop: 40,
    marginLeft: 15,
    fontFamily: "PoppinsSemiBold",
  },
  text3: {
    fontSize: 12,
    marginTop: 0,
    marginBottom: 10,
    marginLeft: 15,
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
    fontSize: 20,
    textAlign: "center",
    textAlign: "center",
    fontFamily: "PoppinsSemiBold",
  },
  subheading: {
    fontSize: 12,
    fontWeight: "200",
    textAlign: "center",
    marginTop: -20,
    textAlign: "center",
    fontFamily: "Poppins",
  },
});
