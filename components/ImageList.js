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
              style={{}}
              onPress={() => navigation.navigate("PostDetails", { post: item })}
            >
              <Image
                style={styles.image}
                source={{
                  uri: `https://propatizadmin.com/storage/${item.images[0]}`,
                }}
              />
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#34779a" />
          <Text
            style={{
              fontFamily: "Poppins",
              color: "#808080",
              fontSize: 10,
              justifyContent: "center",
              alignItems: "center",
              left: 100,
              top: -30,
            }}
          >
            Your liked properties {"\n"}appear here
          </Text>
        </View>
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
    borderRadius: 10,
    marginLeft: width * 0.03,
    marginTop: 5,
  },
});
