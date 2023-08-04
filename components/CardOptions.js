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
      const response = await fetch(`${BASE_URL}/api/posts`, {
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
    <View style={tw`pl-2`}>
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
                  source={{ uri: `${BASE_URL}${item.images[0]}` }}
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
                      color="#fff"
                      size={40}
                      style={styles.likeIcon}
                    />
                  ) : (
                    <AntDesign
                      name="hearto"
                      color="#fff"
                      size={40}
                      style={styles.likeIcon}
                    />
                  )}
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 5,
                  }}
                >
                  <Text style={[styles.price, tw` pl-2 mt-2`]}>
                    {item.price}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <FontAwesome5
                      name="tape"
                      size={13}
                      color="#45A76E"
                      style={{ marginLeft: 58, marginTop: 10 }}
                    />
                    <Text style={[styles.row, tw` pl-1 mt-2`]}>
                      {item.size}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <FontAwesome5
                      name="circle-notch"
                      size={13}
                      color="#45A76E"
                      style={{ marginLeft: 18, marginTop: 10 }}
                    />
                    <Text style={[styles.row, tw` pl-1 mt-2`]}>
                      {item.status}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    marginLeft: 5,
                  }}
                >
                  <Text
                    style={[styles.title, tw` pl-2 mt-2`]}
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
                      style={{ marginTop: 1, marginLeft: 8 }}
                    />
                    <Text style={[styles.row, tw` ml-5 mt--4`]}>
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
    top: 10,
    right: 10,
    left: 260,
  },
  likeIcon: {
    width: 40,
    height: 40,
    resizeMode: "cover",
  },
  image: {
    width: width - 65,
    height: 190,
    resizeMode: "stretch",
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
    backgroundColor: "#fff",
    elevation: 2,
    padding: 8,
  },
  row: {
    fontSize: 12,
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
