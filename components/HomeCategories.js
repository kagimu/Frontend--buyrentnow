import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import tw from "twrnc";
//import { BASE_URL } from '@env'

const { width, height } = Dimensions.get("window");
const data = [
  {
    id: "1",
    title: "Land",
    image: "https://i.imgur.com/uzXfUA3.jpg",
    screen: "CategoryScreen",
  },
  {
    id: "2",
    title: "Apartments",
    image: "https://i.imgur.com/rDA1UYY.jpg",
    screen: "CategoryScreen",
  },
  {
    id: "3",
    title: "Houses",
    image: "https://i.imgur.com/QLMLSZy.jpg",
    screen: "CategoryScreen",
  },
  {
    id: "4",
    title: "Commercial",
    image: "https://i.imgur.com/ip3wkg1.jpg",
    screen: "CategoryScreen",
  },
];

const HomeCategories = () => {
  const navigation = useNavigation();

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View
        style={{
          paddingLeft: 0,
          flexDirection: "row",
          // justifyContent: "space-around",
          marginHorizontal: 10,
        }}
      >
        <View style={[tw`mr-4 mb-2 mt-2`]}>
          <View style={[styles.card2]}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ApartmentsRent")}
            >
              <Image
                style={[styles.image, tw``]}
                source={{ uri: "https://i.imgur.com/rDA1UYY.jpg" }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.word}>Apartments</Text>
        </View>
        <View style={[tw`mr-4 mb-2 mt-2`]}>
          <View style={[styles.card2]}>
            <TouchableOpacity onPress={() => navigation.navigate("HousesRent")}>
              <Image
                style={[styles.image, tw``]}
                source={{ uri: "https://i.imgur.com/QLMLSZy.jpg" }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.word}>Houses</Text>
        </View>
        <View style={[tw`mr-4 mb-2 mt-2`]}>
          <View style={[styles.card2]}>
            <TouchableOpacity
              onPress={() => navigation.navigate("CommercialRent")}
            >
              <Image
                style={[styles.image, tw``]}
                source={{ uri: "https://i.imgur.com/ip3wkg1.jpg" }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.word}>Commercial</Text>
        </View>
        <View style={[tw`mr-4 mb-2 mt-2`]}>
          <View style={[styles.card2]}>
            <TouchableOpacity onPress={() => navigation.navigate("LandRent")}>
              <Image
                style={[styles.image, tw``]}
                source={{ uri: "https://i.imgur.com/uzXfUA3.jpg" }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.word}>Land</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeCategories;

const styles = StyleSheet.create({
  image: {
    width: width - 274,
    height: height * 0.13,
    resizeMode: "contain",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderColor: "white",
    borderWidth: 2,
  },
  card2: {
    borderTopRightRadius: 31,
    borderTopLeftRadius: 31,
    borderBottomLeftRadius: 31,
    borderBottomRightRadius: 31,
    backgroundColor: "#fff",
    borderColor: "#D8D8D8",
    borderWidth: 2,
  },
  word: {
    padding: width * 0.02,
    fontFamily: "PoppinsSemiBold",
    fontSize: width * 0.033,
    alignContent: "center",
    textAlign: "center",
  },
});
