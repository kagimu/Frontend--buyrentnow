import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { BASE_URL } from "@env";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const ImageCarousel = ({ data }) => {
  // Get the device screen width
  const { width } = Dimensions.get("window");

  const renderItem = ({ item }) => {
    // Determine if the current post is liked or not

    return (
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: `${BASE_URL}${item}`,
          }}
          style={styles.image}
        />
      </View>
    );
  };

  return data?.length > 0 ? (
    <SliderBox
      images={data}
      renderItem={renderItem}
      loop={false}
      autoplay={false}
      autoplayInterval={10000}
      dotColor="#387981"
      inactiveDotColor="white"
      fadeInDuration={500} // Set a duration in milliseconds for fade-in transition
      fadeOutDuration={500}
    />
  ) : null;
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    width: "100%",
    marginLeft: 2,
    position: "relative",
  },
  image: {
    width: "100%",
    aspectRatio: 3 / 2,
    resizeMode: "cover",
    borderRadius: 10,
  },
  likeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  likeIcon: {
    width: 40,
    height: 40,
    resizeMode: "cover",
  },
});

export default ImageCarousel;
