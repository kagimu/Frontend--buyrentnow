import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ImageTileScreen = () => {
  return (
    <View>
      <TouchableOpacity onPress={navigation.navigate("ImageSelector")}>
        <Text style={styles.buttonText}>Open Image Picker</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImageTileScreen;

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "blue",
    top: 20,
    paddingBottom: 40,
  },
});
