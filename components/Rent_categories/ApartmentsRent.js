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

const ApartmentsRent = ({ navigation }) => {
  const [data, setData] = useState([]);

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
    <View
      style={{
        paddingBottom: 200,
        paddingVertical: 5,
        backgroundColor: "#f6f8fc",
      }}
    >
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{}}
      >
        <View
          style={{
            flexDirection: "row",
            paddingLeft: 55,
            marginHorizontal: 5,
            paddingTop: 10,
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
            onPress={() => navigation.navigate("ApartmentsRent")}
          >
            <Text style={styles.ActiveText}>Apartments</Text>
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
            onPress={() => navigation.navigate("CommercialRent")}
          >
            <Text style={styles.Text}>Commercial</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Text
        style={{
          fontSize: 25,
          fontFamily: "PoppinsSemiBold",
          textAlign: "left",
          padding: 2,
          marginLeft: 10,
        }}
      >
        Rent Apartments
      </Text>
      {books.length > 0 ? (
        <FlatList
          data={books.filter(
            (post) => post.status == "rental" && post.category_id == "1"
          )}
          Vertical
          showsHorizontalScrollIndicator={false}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          initialNumToRender={10}
          windowSize={10}
          legacyImplementation={true}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.card, tw`pb-7 pt-2`]}>
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
                  <Ionicons
                    name="md-bed-outline"
                    size={15}
                    color="#6495ED"
                    style={{
                      position: "absolute",
                      top: 13,
                      left: 60,
                    }}
                  />

                  <Text style={[styles.row, tw` pl-21 mt-3`]}>{item.size}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <FontAwesome5
                    name="bath"
                    size={12}
                    color="#6495ED"
                    style={{
                      position: "absolute",
                      top: 15,
                      left: 25,
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
          )}
        />
      ) : (
        <ActivityIndicator size="large" color="#387981" />
      )}
    </View>
  );
};

ApartmentsRent.navigationOptions = ({ navigation }) => ({
  headerLeft: () => <CustomHeaderBackButton />,
});
export default ApartmentsRent;

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
    width: "100%",
    height: Dimensions.get("window").height - 380,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
