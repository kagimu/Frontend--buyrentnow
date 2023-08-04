import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";

const ImageSlider = () => {
  const { width, height } = Dimensions.get("window");
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{}}
    >
      <View style={{}}>
        <Image
          style={styles.image}
          source={{ uri: "https://i.imgur.com/9IlSXeb.jpg" }}
        />
      </View>
      <View>
        <Image
          style={styles.image}
          source={{ uri: "https://i.imgur.com/h3RheIY.jpg" }}
        />
      </View>
    </ScrollView>
  );
};

export default ImageSlider;

const styles = StyleSheet.create({
  image: {
    //aspectRatio: 4 / 3,
    width: "400%",
    height: 100,
    resizeMode: "contain",
    borderColor: "white",
    borderWidth: 2,
    marginHorizontal: 10,
  },
});
