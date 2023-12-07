import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { ImagePicker } from "expo-image-multiple-picker";
import * as FileSystem from "expo-file-system";

const ImageSelector = ({ navigation, route }) => {
  const [images, setImages] = useState([]);
  const [showImagePicker, setShowImagePicker] = useState(true);

  const handleImageSelection = async (selectedImages) => {
    const imagesWithFileObj = await Promise.all(
      selectedImages.map(async (image, index) => {
        const fileInfo = await FileSystem.getInfoAsync(image.uri);
        const type = fileInfo.mimeType || "image/jpeg";

        const fileObj = {
          uri: image.uri,
          type: type,
          name: image.filename,
        };

        return fileObj;
      })
    );

    // Now imagesWithFileObj is an array of file objects with correct types
    setImages(imagesWithFileObj);
    setShowImagePicker(false);
    navigation.navigate("BookingConfirmation", { images: imagesWithFileObj });
  };

  const handleCloseImagePicker = () => {
    setShowImagePicker(false);
    navigation.goBack();
    console.log("Image Picker Closed");
  };

  // Add this just before returning from the component
  console.log("Rendered with images:", images);

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image.uri }}
            style={styles.selectedImage}
          />
        ))}
      </ScrollView>

      {showImagePicker && (
        <ImagePicker
          onSave={(assets) => handleImageSelection(assets)}
          onCancel={() => handleCloseImagePicker()}
          multiple
          limit={10}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FC",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "blue",
    marginBottom: 100,
  },
  selectedImage: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
});

export default ImageSelector;
