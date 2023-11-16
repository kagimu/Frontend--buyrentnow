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

const { width, height } = Dimensions.get("window");

const ImageCarousel = ({ data }) => {
  // Get the device screen width
  const { width } = Dimensions.get("window");

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: `${item}`,
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
      dotColor="#fff"
      inactiveDotColor="#808080"
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
    width: width - 38,
    height: height * 0.3,
    resizeMode: "cover",
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
