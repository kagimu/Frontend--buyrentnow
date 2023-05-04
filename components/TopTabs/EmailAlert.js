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

const EmailAlert = ({ route }) => {
  const { pic } = route.params;
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <View style={styles.card}>
        <View>
          <Text style={styles.heading}>Thank You</Text>
          <FlatList
            data={[pic]}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <Image
                  style={{
                    width: 260,
                    height: 100,
                    resizeMode: "cover",
                    borderRadius: 10,
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                  source={{ uri: `${BASE_URL}${pic.images[0]}` }}
                />
              </View>
            )}
          />
          <Text
            style={{
              fontFamily: "Poppins",
              fontSize: 19,
              marginBottom: 20,
            }}
          >
            Our Agent will contact you in less than 30 Minutes
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
          onPress={() => navigation.navigate("HomeScreen")}
        >
          Find more listings
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmailAlert;

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
