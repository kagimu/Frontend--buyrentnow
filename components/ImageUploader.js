import React, { useState, useEffect } from "react";
import { View, Image, Button, StyleSheet, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";

const ImageUploader = ({ profile_pic }) => {
  return (
    <ScrollView horizontal>
      {profile_pic.map((image, index) => (
        <Image key={index} source={{ uri: image.uri }} style={styles.image} />
      ))}
    </ScrollView>
  );
};

export default ImageUploader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
  },
});
