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
import { Ionicons } from "@expo/vector-icons";
import ImageCarousel from "../components/ImageCarousel";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { removeBookmark } from "../redux/actions";

const SavedPage = () => {
  const CustomHeaderBackButton = () => {
    const navigation = useNavigation();

    const handleBackButtonPress = () => {
      navigation.goBack();
    };

    return (
      <TouchableOpacity onPress={handleBackButtonPress}>
        <Ionicons name="chevron-back-circle-outline" size={24} color="black" />
      </TouchableOpacity>
    );
  };
  const { bookmarks } = useSelector((state) => state.booksReducer);
  const dispatch = useDispatch();

  const removeFromBookmarkList = (book) => dispatch(removeBookmark(book));
  const navigation = useNavigation();
  const handleRemoveBookmark = (book) => {
    removeFromBookmarkList(book);
  };

  if (bookmarks.length == 0) {
    return (
      <View
        style={{
          backgroundColor: "#f6f8fc",
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
          flex: 1,
        }}
      >
        <Image
          style={{ width: 200, height: 200, resizeMode: "contain" }}
          source={{ uri: "https://i.imgur.com/pwe8wB6.png" }}
        />
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, paddingBottom: 50, backgroundColor: "#f6f8fc" }}>
        <Text
          style={{
            fontSize: 24,
            textAlign: "left",
            fontFamily: "PoppinsSemiBold",
            padding: 10,
            marginLeft: 8,
            marginTop: 15,
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
              <View style={[styles.card, tw`pb-7`]}>
                <View>
                  <ImageCarousel data={item.post_images} />
                  <TouchableOpacity
                    style={styles.likeButton}
                    onPress={() => handleRemoveBookmark(item)}
                  >
                    <AntDesign
                      name="heart"
                      color="#ff8B53"
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

SavedPage.navigationOptions = ({ navigation }) => ({
  headerLeft: () => <CustomHeaderBackButton />,
});

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
    width: 200,
    height: 200,
    alignContent: "center",
    justifyContent: "center",
    resizeMode: "contain",

    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  card: {
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: "#fff",
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
