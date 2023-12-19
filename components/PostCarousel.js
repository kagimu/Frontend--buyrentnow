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

const PostCarousel = ({ data }) => {
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
      ImageComponentStyle={{}}
      dotStyle={{ display: "none" }}
    />
  ) : null;
};

const styles = StyleSheet.create({
  itemContainer: { position: "relative" },
  image: {
    width: "100%",
    height: 350,
    resizeMode: "cover",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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

export default PostCarousel;
