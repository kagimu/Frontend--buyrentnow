import {
  Button,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import CardOptions from "./CardOptions";
import tw from "twrnc";
import HomeCategories from "./HomeCategories";
import BuyHomeCategories from "./BuyHomeCategories";

const image = { uri: "https://i.imgur.com/78lC493.jpg" };
const { width, height } = Dimensions.get("window");
const aspectRatio = width / height;

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ImageBackground
        style={{
          width: width - 18,
          height: 160,
          resizeMode: "contain",
          marginTop: 25,
          marginBottom: 20,
          marginRight: 20,
          marginLeft: 10,
        }}
        source={{
          uri: "https://i.imgur.com/GCjnNOS.jpg",
        }}
        imageStyle={{ borderRadius: 10 }}
      >
        <Text style={styles.text}>Property searching {"\n"}made easy</Text>
      </ImageBackground>

      <Text style={styles.text0}>
        You can now easily find a property you like {"\n"}across the country
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
          marginHorizontal: 10,
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
            padding: 2,
            marginHorizontal: 167,
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            marginBottom: 10,
            marginTop: -10,
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
          marginHorizontal: 10,
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
            padding: 2,
            marginHorizontal: 166,
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            marginBottom: 10,
            marginTop: -15,
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

      <View style={{ flex: 1 }}>
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
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: "#F6F8FC",
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
  text: {
    fontSize: 25,
    fontFamily: "PoppinsBold",
    marginTop: 40,
    color: "white",
    marginLeft: 30,
    fontFamily: "PoppinsBold",
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
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 12,
    textAlign: "left",
    fontFamily: "PoppinsSemiBold",
  },
  text1: {
    fontSize: 18,
    marginTop: 30,
    marginLeft: 15,
    fontFamily: "PoppinsBold",
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
    fontFamily: "PoppinsBold",
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
