import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { Octicons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { BASE_URL } from "@env";
import ImageCarousel from "../ImageCarousel";
import { BackHandler } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getBooks, addBookmark, removeBookmark } from "../../redux/actions";
import { getTimeAgo } from "../TopTabs/getTimeAgo";

const { width, height } = Dimensions.get("window");
const CommercialRent = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [createdAt, setCreatedAt] = useState([]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        navigation.goBack(); // Navigate back when the back button is pressed
        return true; // Prevent default behavior
      }
    );
    return () => backHandler.remove(); // Cleanup subscription when component unmounts
  }, [navigation]);

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
    <View style={{ backgroundColor: "#f6f8fc", marginTop: height * 0.035 }}>
      <View
        style={{
          marginBottom: height * 0.55,
          // paddingVertical: 5,
          backgroundColor: "#f6f8fc",
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontFamily: "PoppinsSemiBold",
            textAlign: "center",
            paddingTop: height * 0.02,
            marginLeft: width * 0.06,
          }}
        >
          Rent Commercial Places
        </Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            padding: height * 0.01,
            paddingLeft: width * 0.02,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 0,
              paddingTop: 0,
            }}
          >
            <TouchableOpacity
              style={[tw`text-center w-18`, styles.b1]}
              onPress={() => navigation.navigate("AllCategory")}
            >
              <Text style={styles.Text}>All</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonActive}
              onPress={() => navigation.navigate("CommercialRent")}
            >
              <Text style={styles.ActiveText}>Commercial</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[tw`text-center w-20`, styles.b1]}
              onPress={() => navigation.navigate("LandRent")}
            >
              <Text style={styles.Text}>Land</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.b1}
              onPress={() => navigation.navigate("HousesRent")}
            >
              <Text style={styles.Text}>Houses</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.b1}
              onPress={() => navigation.navigate("ApartmentRent")}
            >
              <Text style={styles.Text}>Apartment</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {books.length > 0 ? (
          <FlatList
            data={books.filter(
              (post) => post.status == "rental" && post.category_id == "3"
            )}
            Vertical
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={50}
            initialNumToRender={10}
            windowSize={10}
            legacyImplementation={true}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.postContainer}>
                <View style={[styles.card, tw`pb-7`]}>
                  <View style={{ top: 10 }}>
                    <ImageCarousel data={item.post_images} />
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
                  </View>
                  <View>
                    <Text style={[styles.time, tw` pl-3 mt-4`]}>
                      Posted {getTimeAgo(item.created_at)}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: 5,
                    }}
                  >
                    <Text style={[styles.price, tw` pl-2 mt-1`]}>
                      {item.price}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Ionicons
                        name="md-bed-outline"
                        size={15}
                        color="#00b173"
                        style={{
                          position: "absolute",
                          top: 9,
                          left: 60,
                        }}
                      />

                      <Text style={[styles.row, tw` pl-21 mt-2`]}>
                        {item.bedroom} beds
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <FontAwesome5
                        name="bath"
                        size={12}
                        color="#00b173"
                        style={{
                          position: "absolute",
                          top: 10,
                          left: 25,
                        }}
                      />
                      <Text style={[styles.row, tw` pl-11 mt-2`]}>
                        {item.bathroom} baths
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text style={[styles.per, tw` pl-4`]}>Per Month</Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      marginLeft: 5,
                    }}
                    onPress={() =>
                      navigation.navigate("PostDetails", { post: item })
                    }
                  >
                    <Text style={[styles.name, tw` pl-2 text-lg`]}>
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
                        color="#00b173"
                        style={{
                          marginTop: 31,
                          marginLeft: 8,
                        }}
                      />
                      <Text style={[styles.row, tw` pl-6 mt--4.5`]}>
                        {item.location}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "Poppins",
                          fontSize: 11,
                          position: "absolute",
                          top: 45,
                          left: 25,
                          color: "#808080",
                        }}
                      >
                        See more
                      </Text>

                      <View></View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
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
                fontSize: 22,
                color: "#387981",
              }}
            >
              No Internet Connection
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

CommercialRent.navigationOptions = ({ navigation }) => ({
  headerLeft: () => <CustomHeaderBackButton />,
});
export default CommercialRent;

const styles = StyleSheet.create({
  postContainer: {
    borderRadius: 10, // Adjust the border radius as needed
    marginBottom: 20, // Optional: Add margin between each post card
    backgroundColor: "#fff",
    margin: 10,
    //elevation: 1,
  },
  likeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    left: 290,
  },
  likeIcon: {
    position: "absolute",
    width: 40,
    height: 40,
  },
  name: {
    position: "absolute",
    fontFamily: "PoppinsSemiBold",
  },
  buttonActive: {
    backgroundColor: "#25749b",
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: "#fff",
    paddingBottom: height * 0.1,
  },
  row: {
    fontSize: 12,
    paddingLeft: 0,
    fontFamily: "Poppins",
  },
  time: {
    fontSize: width * 0.03,
    fontFamily: "Poppins",
    color: "#808080",
  },
  per: {
    fontSize: width * 0.03,
    fontFamily: "Poppins",
    top: -6,
    color: "#808080",
  },
  price: {
    fontSize: 14,
    fontFamily: "PoppinsSemiBold",
  },
  button: {
    fontSize: 20,
    fontFamily: "PoppinsSemiBold",
    color: "blue",
    marginBottom: 20,
  },
  video: {
    width: "100%",
    height: Dimensions.get("window").height - 380,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
