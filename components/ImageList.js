import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { BASE_URL } from "@env";
import { useEffect } from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ImageList = () => {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const getPostImages = async () => {
    try {
      const token = await AsyncStorage.getItem("token"); // Retrieve the token from AsyncStorage
      const response = await fetch(`${BASE_URL}/api/posts`, {
        headers: { Authorization: `Bearer ${token}` }, // Set the Authorization header
      });

      if (!response.ok) {
        throw new Error("Request failed with status code " + response.status);
      }

      const data = await response.json();
      console.log("Data from API:", data); // log data to the console
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostImages();
  }, []);
  return (
    <View>
      {data.length > 0 ? (
        <FlatList
          data={data}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tw``}
              onPress={() => navigation.navigate("PostDetails", { post: item })}
            >
              <Image
                style={styles.image}
                source={{ uri: `${BASE_URL}${item.images[0]}` }}
              />
            </TouchableOpacity>
          )}
        />
      ) : (
        <ActivityIndicator size="large" color="#387981" />
      )}
    </View>
  );
};

export default ImageList;

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 140,
    resizeMode: "cover",
    borderRadius: 15,
    marginLeft: 5,
    marginTop: 5,
  },
});
