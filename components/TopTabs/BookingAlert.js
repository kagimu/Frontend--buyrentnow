import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "@env";
import React from "react";

const BookingAlert = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        marginTop: -20,
      }}
    >
      <View style={styles.card}>
        <View>
          <Text style={styles.heading}>Thank You</Text>
          <Text
            style={{
              fontFamily: "Poppins",
              fontSize: 16,
              marginBottom: 20,
            }}
          >
            Your Property has been successfully uploaded and will be viewed by
            other potential rental space seekers. Thank you once again for
            choosing Propatiz.
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          marginTop: 400,
          backgroundColor: "green",
          padding: 19,
          borderRadius: 20,
          alignContent: "center",
          justifyContent: "center",
          marginHorizontal: 10,
        }}
      >
        <Text
          style={{ fontFamily: "PoppinsSemiBold", fontSize: 17, color: "#fff" }}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "HomeScreen" }],
            })
          }
        >
          Find more listings
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookingAlert;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#F6F8FC",
    position: "absolute",
    padding: 30,
    borderRadius: 20,
    marginHorizontal: 20,
  },
  heading: {
    fontFamily: "PoppinsExtraBold",
    fontSize: 30,
    alignContent: "center",
    justifyContent: "center",
  },
});
