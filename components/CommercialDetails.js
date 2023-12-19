import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Linking,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { Octicons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { BASE_URL } from "@env";
import List from "./List";
import { Video } from "expo-av";
import ImageCarousel from "./ImageCarousel";
import PostCarousel from "./PostCarousel";

const { width, height } = Dimensions.get("window");

const data = [
  {
    id: "1",
    title: "Agricultural Land Nkonkonjeru Mukono",
    price: "UGX 20,000,000",
    dollarPrice: "2600",
    location: "Nkonkonjeru town, Bubwa village",
    size: "60 Acres",
    status: "For Sale",
    image: "https://i.imgur.com/n6DWTUo.jpg",
    screen: "CategoryScreen",
    type: "Residential",
    category: "Land",
    description:
      "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.",
  },
];

const CommercialDetails = ({ route }) => {
  const { post } = route.params;
  const navigation = useNavigation();
  const handleCallOwner = () => {
    // Check if the owner's contact number is available
    if (post && post.contact) {
      // Use Linking to open the phone's call app
      const phoneNumber = `tel:${post.contact}`;
      Linking.openURL(phoneNumber)
        .then((supported) => {
          if (!supported) {
            console.log("Phone number is not supported");
          }
        })
        .catch((err) => console.error("Error opening phone app:", err));
    } else {
      console.warn("Owner contact number is not available");
    }
  };
  return (
    <View>
      <FlatList
        data={data}
        Vertical
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, tw` bg-gray-100 pb-20 `]}>
            <PostCarousel data={post.post_images} style={styles.image} />

            <View
              style={{
                flexDirection: "row",
                padding: height * 0.01,
                marginLeft: width * 0.025,
              }}
            >
              <Image
                source={{ uri: `${post.profile_pic_url}` }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                }}
              />
              <View style={{ marginLeft: width * 0.02, top: 6 }}>
                <Text
                  style={{
                    fontSize: width * 0.035,
                    fontFamily: "PoppinsSemiBold",
                    color: "#808080",
                  }}
                >
                  {post.owner}
                </Text>
                <Text
                  style={{
                    fontSize: width * 0.03,
                    fontFamily: "Poppins",
                    color: "#808080",
                    top: -height * 0.01,
                  }}
                >
                  Landlord
                </Text>
              </View>
            </View>
            <Text style={[styles.name, tw` pl-5 mt-2 text-lg`]}>
              {post.name}
            </Text>
            <View
              styles={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 7,
              }}
            >
              <Octicons
                name="location"
                size={16}
                color="#45A76E"
                style={{ marginTop: 15, marginLeft: 20 }}
              />
              <Text style={[styles.row, tw` pl-10 mt--4 `]}>
                {post.location}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <FontAwesome5
                  name="tape"
                  size={18}
                  color="#45A76E"
                  style={{ marginLeft: 21, marginTop: 6 }}
                />
                <Text style={[styles.row, tw` pl-1 mt-2`]}>{post.size}</Text>
              </View>
            </View>
            <View style={[tw`pl-3`]}>
              <List post={post} />
            </View>
            <View>
              <Text style={[styles.desc, tw` pl-6 text-sm`]}>Description</Text>
              <Text style={[styles.desc1, tw` pl-6 mt-2 `]}>{post.desc}</Text>
            </View>
            <View
              style={{
                backgroundColor: "#fff",
                padding: 10,
                paddingBottom: 10,
                marginTop: 10,
                marginLeft: 10,
                marginRight: 10,
                borderRadius: 10,
                marginBottom: -10,
              }}
            >
              <View style={tw`pl-1`}>
                <Text style={{ fontFamily: "Poppins", fontSize: width * 0.03 }}>
                  Rent Permonth
                </Text>
                <Text
                  style={{
                    fontFamily: "PoppinsSemiBold",
                    fontSize: width * 0.04,
                  }}
                >
                  UGX {post.price}
                </Text>
              </View>
              <View
                style={{
                  marginLeft: 10,
                  backgroundColor: "#ff0061",
                  padding: 15,
                  justifyContent: "center",
                  borderRadius: 20,
                }}
              >
                <TouchableOpacity>
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "PoppinsSemiBold",
                      fontSize: 18,
                      textAlign: "center",
                    }}
                    onPress={handleCallOwner}
                  >
                    Call owner
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default CommercialDetails;

const styles = StyleSheet.create({
  desc: { fontFamily: "PoppinsSemiBold", color: "#808080" },
  desc1: { fontFamily: "Poppins", fontSize: 12, color: "#808080" },
  name: {
    fontFamily: "PoppinsSemiBold",
  },
  image: {
    width: "100%",
    height: 350,
    resizeMode: "cover",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "#000",
  },
  card: {
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: "#000",
  },
  row: {
    fontSize: 12,
    paddingLeft: 3,
    fontFamily: "Poppins",
  },
  price: {
    fontSize: 12,
    fontFamily: "PoppinsSemiBold",
  },
  type: {
    fontSize: 12,
    color: "#45A76E",
    fontFamily: "PoppinsSemiBold",
  },
  smallImage: {
    height: 100,
    width: 100,
    borderRadius: 10,
    paddingLeft: 10,
  },
});
