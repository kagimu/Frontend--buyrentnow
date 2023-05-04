import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useRef } from "react";
import tw from "twrnc";
import { Octicons, FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { BASE_URL } from "@env";
import ImageCarousel from "../ImageCarousel";
import { AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { getBooks, addBookmark, removeBookmark } from "../../redux/actions";

const HousesBuy = ({ navigation }) => {
  const [data, setData] = useState([]);

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
    <View style={{ paddingBottom: 200, paddingVertical: 5 }}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{}}
      >
        <View
          style={{
            flexDirection: "row",
            paddingLeft: 35,
            marginHorizontal: 5,
            paddingTop: 10,
          }}
        >
          <TouchableOpacity
            style={[tw`text-center w-18`, styles.b3]}
            onPress={() => navigation.navigate("AllCategoryBuy")}
          >
            <Text style={styles.Text}>ALL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonActive}
            onPress={() => navigation.navigate("HousesBuy")}
          >
            <Text style={styles.ActiveText}>HOUSES</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[tw`text-center w-20`, styles.b3]}
            onPress={() => navigation.navigate("LandBuy")}
          >
            <Text style={styles.Text}>LAND</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.b3}
            onPress={() => navigation.navigate("ApartmentsBuy")}
          >
            <Text style={styles.Text}>APARTMENTS</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.b3}
            onPress={() => navigation.navigate("CommercialBuy")}
          >
            <Text style={styles.Text}>COMMERCIAL</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Text
        style={{
          fontSize: 30,
          fontFamily: "PoppinsSemiBold",
          textAlign: "left",
          padding: 4,
          marginLeft: 10,
        }}
      >
        Buy A House
      </Text>
      {books.length > 0 ? (
        <FlatList
          data={books.filter(
            (post) => post.status == "for sale" && post.category_id == "2"
          )}
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
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 5,
                }}
              >
                <Text style={[styles.price, tw` pl-2 mt-2`]}>{item.price}</Text>
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
                  <Text style={[styles.row, tw` pl-21 mt-3`]}>{item.size}</Text>
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

                  <View></View>
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
};

export default HousesBuy;

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
  b3: {
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
    fontFamily: "Poppins",
    textAlign: "center",
    alignContent: "center",
    padding: 15,
    color: "#fff",
  },
  Text: {
    fontFamily: "PoppinsSemiBold",
    color: "#000",
    textAlign: "center",
    alignContent: "center",
    padding: 15,
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
    fontSize: 14,
    paddingLeft: 0,
    fontFamily: "Poppins",
  },
  price: {
    fontSize: 18,
    fontFamily: "PoppinsSemiBold",
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
      position: "absolute",
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
      position: "absolute",
    },
    ActiveText: {
      fontFamily: "PoppinsSemiBold",
      textAlign: "center",
      alignContent: "center",
      padding: 15,
      color: "#fff",
      position: "absolute",
    },
    Text: {
      fontFamily: "PoppinsSemiBold",
      color: "#000",
      textAlign: "center",
      alignContent: "center",
      padding: 15,
      position: "absolute",
    },
    image: {
      width: 360,
      height: 400,
      resizeMode: "contain",
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      position: "absolute",
    },
    card: {
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
      position: "absolute",
    },
    row: {
      fontSize: 14,
      paddingLeft: 0,
      position: "absolute",
      fontFamily: "Poppins",
    },
    price: {
      fontSize: 18,
      position: "absolute",
      fontFamily: "Poppins",
    },
    button: {
      fontSize: 20,
      fontFamily: "PoppinsSemiBold",
      color: "blue",
      marginBottom: 20,
      position: "absolute",
    },
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
