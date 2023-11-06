import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  FlatList,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { ImagePicker } from "expo-image-multiple-picker";

const Imagess = () => {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={pickedImages}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={{
              height: 75,
              width: 75,
              borderRadius: 10,
              marginHorizontal: 10,
              resizeMode: "contain",
            }}
          />
        )}
      />
    </View>
  );
};

export default Imagess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
