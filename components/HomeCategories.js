import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import tw from "twrnc";
//import { BASE_URL } from '@env'

const data = [
  {
    id: "1",
    title: "Land",
    image: "https://i.imgur.com/rrx2APb.jpg",
    screen: "CategoryScreen",
  },
  {
    id: "2",
    title: "Apartments",
    image: "https://i.imgur.com/Vh9Tjyo.jpg",
    screen: "CategoryScreen",
  },
  {
    id: "3",
    title: "Houses",
    image: "https://i.imgur.com/3a5J8VD.jpg",
    screen: "CategoryScreen",
  },
  {
    id: "4",
    title: "Commercial",
    image: "https://i.imgur.com/E7LjeCk.jpg",
    screen: "CategoryScreen",
  },
];

const HomeCategories = () => {
  const navigation = useNavigation();

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={{ paddingLeft: 5, flexDirection: "row" }}>
        <View style={[tw`mr-4 mb-2 mt-2`]}>
          <View style={[styles.card2]}>
            <TouchableOpacity onPress={() => navigation.navigate("LandRent")}>
              <Image
                style={[styles.image, tw``]}
                source={{ uri: "https://i.imgur.com/rrx2APb.jpg" }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.word}>Land</Text>
        </View>
        <View style={[tw`mr-4 mb-2 mt-2`]}>
          <View style={[styles.card2]}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ApartmentsRent")}
            >
              <Image
                style={[styles.image, tw``]}
                source={{ uri: "https://i.imgur.com/Vh9Tjyo.jpg" }}
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
                source={{ uri: "https://i.imgur.com/3a5J8VD.jpg" }}
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
                source={{ uri: "https://i.imgur.com/E7LjeCk.jpg" }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.word}>Commercial</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeCategories;

const styles = StyleSheet.create({
  image: {
    width: 85,
    height: 88,
    resizeMode: "stretch",
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
    padding: 6,
    fontFamily: "PoppinsSemiBold",
    fontSize: 12,
    alignContent: "center",
    textAlign: "center",
  },
});
