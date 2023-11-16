import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import tw from "twrnc";
import {
  Ionicons,
  AntDesign,
  Octicons,
  FontAwesome5,
} from "@expo/vector-icons";
import { useState } from "react";
import { BASE_URL } from "@env";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { getBooks, addBookmark, removeBookmark } from "../redux/actions";

const { width, height } = Dimensions.get("window");
const aspectRatio = width / height;

const CardOptions = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const MAX_CHARS = 33;

  const { books, bookmarks } = useSelector((state) => state.booksReducer);
  const dispatch = useDispatch();
  const fetchBooks = () => dispatch(getBooks());

  const addToBookmarkList = (book) => dispatch(addBookmark(book));
  const removeFromBookmarkList = (book) => dispatch(removeBookmark(book));

  const handleAddBookmark = (book) => {
    addToBookmarkList(book);
  };

  const handleRemoveBookmark = (book) => {
    removeFromBookmarkList(book);
  };

  const ifExists = (book) => {
    if (bookmarks.filter((item) => item.id === book.id).length > 0) {
      return true;
    }

    return false;
  };

  const getPosts = async () => {
    try {
      const token = await AsyncStorage.getItem("token"); // Retrieve the token from AsyncStorage
      const response = await fetch(`https://propatizadmin.com/api/posts`, {
        headers: { Authorization: `Bearer ${token}` }, // Set the Authorization header
      });

      if (!response.ok) {
        throw new Error("Request failed with status code " + response.status);
      }

      const data = await response.json();
      console.log("Data from API:", data); // log data to the console
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
    fetchBooks();
  }, []);

  return (
    <View style={tw``}>
      {books.length > 0 ? (
        <FlatList
          data={books}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("PostDetails", { post: item })}
            >
              <View style={[styles.card, tw`pb-8 m-1`]}>
                <Image
                  style={[styles.image, tw``]}
                  source={{ uri: `${item.post_images[0]}` }}
                />
                <TouchableOpacity
                  style={styles.likeButton}
                  onPress={() =>
                    ifExists(item)
                      ? handleRemoveBookmark(item)
                      : handleAddBookmark(item)
                  }
                >
                  {ifExists(item) ? (
                    <AntDesign
                      name="heart"
                      color="red"
                      size={35}
                      style={styles.likeIcon}
                    />
                  ) : (
                    <AntDesign
                      name="hearto"
                      color="#fff"
                      size={35}
                      style={styles.likeIcon}
                    />
                  )}
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Text style={[styles.price, tw` mt-2`]}>{item.price}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Ionicons
                      name="md-bed-outline"
                      size={16}
                      color="#45A76E"
                      style={{
                        position: "absolute",
                        left: width * 0.25,
                        marginTop: 8,
                      }}
                    />
                    <Text
                      style={{
                        position: "absolute",
                        fontSize: 10,
                        left: width * 0.3,
                        fontFamily: "Poppins",
                        top: 9,
                      }}
                    >
                      {item.bedroom} beds
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <FontAwesome5
                      name="bath"
                      size={13}
                      color="#45A76E"
                      style={{
                        position: "absolute",
                        left: width * 0.46,
                        marginTop: 8,
                      }}
                    />
                    <Text
                      style={{
                        position: "absolute",
                        fontSize: 10,
                        left: width * 0.5,
                        fontFamily: "Poppins",
                        top: 9,
                      }}
                    >
                      {item.bathroom} baths
                    </Text>
                  </View>
                </View>
                <View>
                  <Text
                    style={[styles.title, tw`mt-2`]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.name.substring(0, MAX_CHARS)}
                  </Text>
                  <View styles={{ flexDirection: "row" }}>
                    <Octicons
                      name="location"
                      size={14}
                      color="#45A76E"
                      style={{ marginTop: 1, marginLeft: 1 }}
                    />
                    <Text style={[styles.row, tw` ml-3 mt--4`]}>
                      {item.location}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Ionicons name="ios-alert-circle" size={50} color="red" />
          <Text
            style={{
              fontFamily: "PoppinsSemiBold",
              fontSize: 18,
              color: "#387981",
            }}
          >
            No Internet Connection
          </Text>
        </View>
      )}
    </View>
  );
};

export default CardOptions;

const styles = StyleSheet.create({
  likeButton: {
    position: "absolute",
    top: height * 0.02,
    left: width * 0.7,
  },
  likeIcon: {
    width: width - 30,
    height: height * 0.2,
  },
  image: {
    width: width - 65,
    height: height * 0.25,
    resizeMode: "cover",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
  },
  card: {
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    marginBottom: 200,
    backgroundColor: "#F6F8FC",
    elevation: 0,
    padding: 8,
  },
  row: {
    fontSize: 10,
    paddingLeft: 5,
    fontFamily: "Poppins",
  },
  price: {
    fontSize: 14,
    fontFamily: "PoppinsSemiBold",
  },
  title: {
    fontSize: 13,
    fontFamily: "PoppinsSemiBold",
  },
});
