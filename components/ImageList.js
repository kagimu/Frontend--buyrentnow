import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { BASE_URL } from "@env";
import { useEffect } from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { removeBookmark } from "../redux/actions";

const { width, height } = Dimensions.get("window");

const ImageList = () => {
  const navigation = useNavigation();

  const { bookmarks } = useSelector((state) => state.booksReducer);
  const dispatch = useDispatch();

  const removeFromBookmarkList = (book) => dispatch(removeBookmark(book));

  const handleRemoveBookmark = (book) => {
    removeFromBookmarkList(book);
  };

  return (
    <View>
      {bookmarks.length > 0 ? (
        <FlatList
          data={bookmarks}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tw``}
              onPress={() => navigation.navigate("PostDetails", { post: item })}
            >
              <Image
                style={styles.image}
                source={{
                  uri: `https://68f0-41-210-143-73.ngrok-free.app/storage/${item.images[0]}`,
                }}
              />
            </TouchableOpacity>
          )}
        />
      ) : (
        <ActivityIndicator size="large" color="#387981" />
      )}
    </View>
  );
};

export default ImageList;

const styles = StyleSheet.create({
  image: {
    height: height * 0.13,
    width: width * 0.3,
    resizeMode: "contain",
    borderRadius: 15,
    marginLeft: width * 0.03,
    marginTop: 5,
  },
});
