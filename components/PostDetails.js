import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { Octicons, FontAwesome5 } from "@expo/vector-icons";
import { BASE_URL } from "@env";
import List from "./List";
import { Video } from "expo-av";
import Likes from "./Likes";

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

const PostDetails = ({ route }) => {
  const { post } = route.params;
  const navigation = useNavigation();
  return (
    <View>
      <FlatList
        data={data}
        Vertical
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, tw` bg-gray-100 pb-20 `]}>
            <Video
              source={{ uri: `${BASE_URL}${post.videos[0]}` }}
              style={[styles.image, tw``]}
              resizeMode="cover"
              isMuted
              isLooping
              shouldPlay={true}
            />
            <Text style={[styles.name, tw` pl-2 mt-2 text-lg`]}>
              {post.name}
            </Text>

            <View styles={{ flexDirection: "row", marginTop: 7 }}>
              <Octicons
                name="location"
                size={14}
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
              <View style={{ flexDirection: "row" }}>
                <FontAwesome5
                  name="tape"
                  size={12}
                  color="#45A76E"
                  style={{ marginLeft: 21, marginTop: 10 }}
                />
                <Text style={[styles.row, tw` pl-1 mt-2`]}>{post.size}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <FontAwesome5
                  name="circle-notch"
                  size={12}
                  color="#45A76E"
                  style={{ marginLeft: 50, marginTop: 10 }}
                />
                <Text style={[styles.row, tw` pl-2 mt-2`]}>{post.status}</Text>
              </View>
              <Text style={[styles.type, tw` pl-10 mt-2 `]}>Type</Text>
              <Text style={[styles.price, tw` pl-2 mt-2 `]}>{post.type}</Text>
            </View>

            <List post={post} />

            <View>
              <Text style={[styles.desc, tw` pl-6 text-sm`]}>Description</Text>
              <Text style={[styles.desc1, tw` pl-6 mt-2 `]}>{post.desc}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
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
              <View style={tw`pl-1 pt-3`}>
                <Text style={{ fontFamily: "Poppins" }}>Price in UGX</Text>
                <Text style={{ fontFamily: "PoppinsSemiBold", fontSize: 14 }}>
                  {post.price}
                </Text>
              </View>
              <View
                style={{
                  marginLeft: 40,
                  backgroundColor: "#34779A",
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
                    }}
                    onPress={() => navigation.navigate("AgentForm")}
                  >
                    Contact an agent
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

export default PostDetails;

const styles = StyleSheet.create({
  desc: { fontFamily: "PoppinsSemiBold" },
  desc1: { fontFamily: "Poppins", fontSize: 12 },
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
