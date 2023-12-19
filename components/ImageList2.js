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
      const response = await fetch(`https://propatizadmin.com/api/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

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
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginHorizontal: 5 }}
        >
          {data.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => navigation.navigate("PostDetails", { post: item })}
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
          ))}
        </ScrollView>
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#34779a" />
          <Text
            style={{
              fontFamily: "Poppins",
              color: "#808080",
              fontSize: 10,
              justifyContent: "center",
              alignItems: "center",
              left: 100,
              top: -25,
            }}
          >
            Your uploaded properties {"\n"}appear here
          </Text>
        </View>
      )}
    </View>
  );
};

export default ImageList2;

const styles = StyleSheet.create({
  image: {
    height: height * 0.13,
    width: width * 0.3,
    resizeMode: "cover",
    borderRadius: 10,
    marginLeft: width * 0.03,
    marginTop: 5,
  },
});
