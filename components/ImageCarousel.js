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

const ImageCarousel = ({ data }) => {
  // Get the device screen width
  const { width } = Dimensions.get("window");

  const renderItem = ({ item }) => {
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
      onCurrentImagePressed={(index) => console.warn(`image ${index} pressed`)}
      ImageComponentStyle={{ borderRadius: 15, width: "90%", marginTop: 5 }}
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
    borderRadius: 8,
    width: "98%",
    marginLeft: 0,
    position: "relative",
  },
  image: {
    width: "97%",
    aspectRatio: 3 / 2,
    resizeMode: "stretch",
    borderRadius: 10,
    marginLeft: 10,
    padding: 10,
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
