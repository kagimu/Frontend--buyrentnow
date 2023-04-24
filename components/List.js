import React from "react";
import { StyleSheet, View, Dimensions, Image } from "react-native";
import tw from "twrnc";
import { BASE_URL } from "@env";

const { width } = Dimensions.get("window");

const List = ({ post }) => {
  return (
    <View style={styles.slide}>
      <View style={{ flexDirection: "row", padding: 20 }}>
        <Image
          style={styles.smallImage}
          source={{ uri: `${BASE_URL}${post.images[0]}` }}
        />
        <Image
          style={styles.smallImage}
          source={{ uri: `${BASE_URL}${post.images[1]}` }}
        />
        <Image
          style={styles.smallImage}
          source={{ uri: `${BASE_URL}${post.images[2]}` }}
        />
        <Image
          style={styles.smallImage}
          source={{ uri: `${BASE_URL}${post.images[3]}` }}
        />
        <Image
          style={styles.smallImage}
          source={{ uri: `${BASE_URL}${post.images[4]}` }}
        />
        <Image
          style={styles.smallImage}
          source={{ uri: `${BASE_URL}${post.images[5]}` }}
        />
        <Image
          style={styles.smallImage}
          source={{ uri: `${BASE_URL}${post.images[6]}` }}
        />
      </View>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flexWrap: "wrap",
    paddingVertical: 20,
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
  },
});
