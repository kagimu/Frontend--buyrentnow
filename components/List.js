import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import tw from "twrnc";
import { BASE_URL } from "@env";

const { width } = Dimensions.get("window");

const List = ({ post }) => {
  const [selectedImage, setSelectedImage] = useState(null); // state variable to keep track of selected image

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const renderSmallImages = () => {
    return post.images.map((image, index) => {
      return (
        <TouchableOpacity key={index} onPress={() => handleImageClick(image)}>
          <Image
            style={styles.smallImage}
            source={{ uri: `${BASE_URL}${image}` }}
          />
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.slide}>
      <View style={{ flexDirection: "row", padding: 20 }}>
        {renderSmallImages()}
      </View>

      {/* Modal to display expanded image */}
      <Modal visible={selectedImage != null} transparent={true}>
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={() => setSelectedImage(null)}
        >
          <Image
            style={styles.expandedImage}
            source={{ uri: `${BASE_URL}${selectedImage}` }}
          />
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flexWrap: "wrap",
    paddingVertical: 0,
    marginLeft: -18,
  },
  video: {
    flex: 1,
  },
  smallImage: {
    height: 80,
    width: 80,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "flex-start",
    justifyContent: "space-between",
    resizeMode: "cover",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  expandedImage: {
    width: width - 40,
    height: width - 40,
    resizeMode: "cover",
    borderRadius: 10,
  },
});
