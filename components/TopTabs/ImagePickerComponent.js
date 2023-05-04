import React from "react";
import { View } from "react-native";
import ImagePicker from "react-native-image-crop-picker";

const ImagePickerComponent = ({
  onSelect,
  multiple,
  maxImages,
  iconColor,
  textButtonSelect,
  textButtonStyle,
}) => {
  const openPicker = () => {
    ImagePicker.openPicker({
      multiple: multiple || false,
      maxFiles: maxImages || 1,
      mediaType: "photo",
      includeBase64: false,
      compressImageQuality: 0.8,
    })
      .then((selected) => {
        if (onSelect) {
          onSelect(selected);
        }
      })
      .catch((error) => {
        console.log("ImagePicker Error: ", error);
      });
  };

  return (
    <View>
      <ImagePicker
        onSelect={onSelect}
        multiple={multiple || false}
        maxImages={maxImages || 1}
        iconColor={iconColor || "#007AFF"}
        textButtonSelect={textButtonSelect || "Select"}
        textButtonStyle={textButtonStyle || { color: "#007AFF" }}
      />
    </View>
  );
};

export default ImagePickerComponent;
