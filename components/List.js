import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import tw from "twrnc";
import { BASE_URL } from "@env";
import { Video } from "expo-av";

const { width } = Dimensions.get("window");

const List = ({ post }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleMediaClick = (media) => {
    setSelectedImage(media);
  };

  const renderSmallMedia = () => {
    return post.post_images.map((media, index) => {
      if (media.video_url) {
        // Render Video component if video URL is present
        return (
          <TouchableOpacity
            key={index}
            onPress={() => handleMediaClick(media.video_url)}
          >
            <Video
              style={styles.smallMedia}
              source={{ uri: media.video_url }}
              resizeMode="cover"
            />
          </TouchableOpacity>
        );
      } else {
        // Render Image component if no video URL
        return (
          <TouchableOpacity key={index} onPress={() => handleMediaClick(media)}>
            <Image style={styles.smallMedia} source={{ uri: `${media}` }} />
          </TouchableOpacity>
        );
      }
    });
  };

  return (
    <View style={styles.slide}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.smallMediaContainer}
      >
        {renderSmallMedia()}
      </ScrollView>

      <Modal visible={selectedImage != null} transparent={true}>
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={() => setSelectedImage(null)}
        >
          {selectedImage && selectedImage.includes(".mp4") ? (
            <Video
              style={styles.expandedMedia}
              source={{ uri: selectedImage }}
              resizeMode="cover"
              controls={true}
            />
          ) : (
            <Image
              style={styles.expandedMedia}
              source={{ uri: `${selectedImage}` }}
            />
          )}
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    marginLeft: -18,
  },
  smallMediaContainer: {
    flexDirection: "row",
    padding: 20,
  },
  smallMedia: {
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
  expandedMedia: {
    width: width - 40,
    height: width - 40,
    resizeMode: "cover",
    borderRadius: 10,
  },
});

export default List;
