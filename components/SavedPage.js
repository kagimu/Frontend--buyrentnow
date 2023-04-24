import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { BASE_URL } from "@env";
import { AntDesign } from "@expo/vector-icons";
import tw from "twrnc";
import { Octicons, FontAwesome5 } from "@expo/vector-icons";
import ImageCarousel from "../components/ImageCarousel";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { removeBookmark } from "../redux/actions";

const SavedPage = () => {
  const [savedPosts, setSavedPosts] = useState([]);

  const { bookmarks } = useSelector((state) => state.booksReducer);
  const dispatch = useDispatch();

  const removeFromBookmarkList = (book) => dispatch(removeBookmark(book));

  const handleRemoveBookmark = (book) => {
    removeFromBookmarkList(book);
  };

  useEffect(() => {
    const getSavedPosts = async () => {
      const savedPosts = await AsyncStorage.getItem("likedPosts");
      setSavedPosts(savedPosts ? JSON.parse(savedPosts) : []);
    };

    getSavedPosts();
  }, []);

  if (bookmarks.length == 0) {
    return (
      <View
        style={{
          textAlign: "center",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <Text style={{ fontFamily: "PoppinsSemiBold", fontSize: 20 }}>
          NO LIKED POSTS
        </Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text
          style={{
            fontSize: 20,
            textAlign: "left",
            fontFamily: "PoppinsSemiBold",
            padding: 20,
            marginLeft: 8,
          }}
        >
          Saved Properties
        </Text>
        {bookmarks.length > 0 ? (
          <FlatList
            data={bookmarks}
            Vertical
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={50}
            initialNumToRender={10}
            windowSize={21}
            legacyImplementation={true}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={[styles.card, tw`pb-7 pt-2 bg-gray-100`]}>
                <View>
                  <ImageCarousel data={item.images} />
                  <TouchableOpacity
                    style={styles.likeButton}
                    onPress={() => handleRemoveBookmark(item)}
                  >
                    <AntDesign
                      name="heart"
                      color="#fff"
                      size={40}
                      style={styles.likeIcon}
                    />
                  </TouchableOpacity>
                </View>
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
                      size={15}
                      color="#6495ED"
                      style={{
                        marginLeft: 60,
                        marginTop: 13,
                        position: "absolute",
                      }}
                    />
                    <Text style={[styles.row, tw` pl-21 mt-3`]}>
                      {item.size}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <FontAwesome5
                      name="circle-notch"
                      size={12}
                      color="#6495ED"
                      style={{
                        marginLeft: 25,
                        marginTop: 15,
                        position: "absolute",
                      }}
                    />
                    <Text style={[styles.row, tw` pl-11 mt-3`]}>
                      {item.status}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    marginLeft: 5,
                  }}
                  onPress={() =>
                    navigation.navigate("PostDetails", { post: item })
                  }
                >
                  <Text style={[styles.name, tw` pl-2 mt-2 text-sm`]}>
                    {item.name}
                  </Text>
                  <View
                    styles={{
                      flexDirection: "row",
                      position: "absolute",
                    }}
                  >
                    <Octicons
                      name="location"
                      size={14}
                      color="#45A76E"
                      style={{
                        marginTop: 31,
                        marginLeft: 8,
                      }}
                    />
                    <Text style={[styles.row, tw` pl-6 mt--4.5`]}>
                      {item.location}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <ActivityIndicator size="large" color="#387981" />
        )}
      </View>
    );
  }
};

export default SavedPage;

const styles = StyleSheet.create({
  likeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    left: 310,
  },
  likeIcon: {
    width: 40,
    height: 40,
    resizeMode: "cover",
  },
  image: {
    width: 300,
    height: 200,
    alignContent: "center",
    justifyContent: "center",
    resizeMode: "contain",
    marginLeft: 30,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  card: {
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  row: {
    fontSize: 12,
    paddingLeft: 0,
    fontFamily: "Poppins",
  },
  name: {
    position: "absolute",
    fontFamily: "PoppinsSemiBold",
  },
  buttonActive: {
    backgroundColor: "#387981",
    marginTop: 5,
    paddingLeft: 0,
    justifyContent: "space-between",
    marginHorizontal: 8,
    marginBottom: 35,
    padding: 0,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  b1: {
    backgroundColor: "#fff",
    marginTop: 5,
    padding: 0,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "space-between",
    marginHorizontal: 5,
  },
  ActiveText: {
    fontFamily: "PoppinsSemiBold",
    textAlign: "center",
    alignContent: "center",
    padding: 16,
    color: "#fff",
  },
  Text: {
    fontFamily: "PoppinsSemiBold",
    color: "#000",
    textAlign: "center",
    alignContent: "center",
    padding: 16,
  },
  image: {
    width: 360,
    height: 400,
    resizeMode: "contain",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  card: {
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  row: {
    fontSize: 12,
    paddingLeft: 0,
    fontFamily: "Poppins",
  },
  price: {
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
  },
  button: {
    fontSize: 20,
    fontFamily: "PoppinsSemiBold",
    color: "blue",
    marginBottom: 20,
  },
  video: {
    width: 330,
    height: 300,
  },
});
