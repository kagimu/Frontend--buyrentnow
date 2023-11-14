import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { BASE_URL } from "@env";
import { useEffect } from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { removeBookmark } from "../redux/actions";

const { width, height } = Dimensions.get("window");

const ImageList2 = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  const getName = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `https://e9b4-41-210-143-73.ngrok-free.app/api/profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error("Request failed with status code " + response.status);
      }

      const userData = await response.json();
      console.log("Data from API:", userData);
      setData(userData.posts); // Set data to the posts array
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <View>
      {data.length > 0 ? (
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{}}>
              <TouchableOpacity
                style={tw``}
                onPress={() =>
                  navigation.navigate("PostDetails", { post: item })
                }
              >
                {item.post_images[0] &&
                  // Check if the first image exists before logging
                  console.log("Image URI:", item.post_images[0])}
                <Image
                  style={styles.image}
                  source={{
                    uri: `${item.post_images[0]}`,
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <ActivityIndicator size="large" color="#387981" />
      )}
    </View>
  );
};

export default ImageList2;

const styles = StyleSheet.create({
  image: {
    height: height * 0.13,
    width: width * 0.3,
    resizeMode: "contain",
    borderRadius: 15,
    marginLeft: width * 0.03,
    marginTop: 5,
  },
});
