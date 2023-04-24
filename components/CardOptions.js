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

const { width, height } = Dimensions.get("window");
const aspectRatio = width / height;

const data = [
  {
    id: "1",
    title: "Agricultural Land Nkonkonjeru Mukono",
    price: "UGX 20,000,000",
    location: "Nkonkonjeru town, Bubwa village",
    size: "60 Acres",
    status: "For Sale",
    image: "https://i.imgur.com/n6DWTUo.jpg",
    screen: "CategoryScreen",
  },
  {
    id: "2",
    title: "Agricultural Land Nkonkonjeru Mukono",
    price: "UGX 20,000,000",
    location: "Nkonkonjeru town, Bubwa village",
    size: "60 Acres",
    status: "For Sale",
    image: "https://i.imgur.com/hukecEk.jpg",
    screen: "CategoryScreen",
  },
  {
    id: "3",
    title: "Agricultural Land Nkonkonjeru Mukono",
    price: "UGX 20,000,000",
    location: "Nkonkonjeru town, Bubwa village",
    size: "60 Acres",
    status: "For Sale",
    image: "https://i.imgur.com/n6DWTUo.jpg",
    screen: "CategoryScreen",
  },
  {
    id: "4",
    title: "Agricultural Land Nkonkonjeru Mukono",
    price: "UGX 20,000,000",
    location: "Nkonkonjeru town, Bubwa village",
    size: "60 Acres",
    status: "For Sale",
    image: "https://i.imgur.com/n6DWTUo.jpg",
    screen: "CategoryScreen",
  },
  {
    id: "5",
    title: "Agricultural Land Nkonkonjeru Mukono",
    price: "UGX 20,000,000",
    location: "Nkonkonjeru town, Bubwa village",
    size: "60 Acres",
    status: "For Sale",
    image: "https://i.imgur.com/n6DWTUo.jpg",
    screen: "CategoryScreen",
  },
];

const CardOptions = () => {
  const navigation = useNavigation();
  return (
    <View style={tw`pl-2`}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("PostDetails")}>
            <View style={[styles.card, tw`pb-8 pt--2 bg-gray-100 m-1 pl-2`]}>
              <Image
                style={[styles.image, tw``]}
                source={{ uri: item.image }}
              />
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
                    size={12}
                    color="#6495ED"
                    style={{ marginLeft: 18, marginTop: 10 }}
                  />
                  <Text style={[styles.row, tw` pl-1 mt-2`]}>{item.size}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <FontAwesome5
                    name="circle-notch"
                    size={12}
                    color="#6495ED"
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
                <Text style={[styles.title, tw` pl-2 mt-2`]}>{item.title}</Text>
                <View styles={{ flexDirection: "row" }}>
                  <Octicons
                    name="location"
                    size={14}
                    color="#45A76E"
                    style={{ marginTop: 1, marginLeft: 8 }}
                  />
                  <Text style={[styles.row, tw` pl-5 mt--4`]}>
                    {item.location}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CardOptions;

const styles = StyleSheet.create({
  image: {
    width: width - 65,
    height: 190,
    resizeMode: "cover",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginLeft: 2,
  },
  card: {
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  row: {
    fontSize: 11,
    paddingLeft: 3,
    fontFamily: "Poppins",
  },
  price: {
    fontSize: 11,
    fontFamily: "PoppinsSemiBold",
  },
  title: {
    fontSize: 13,
    fontFamily: "PoppinsSemiBold",
  },
});
