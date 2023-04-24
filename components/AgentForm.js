import {
  ActivityIndicator,
  Button,
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { BASE_URL } from "@env";

const AgentForm = () => {
  const [data, setData] = useState([]);

  const getAgents = async () => {
    try {
      const token = await AsyncStorage.getItem("token"); // Retrieve the token from AsyncStorage
      const response = await fetch(`${BASE_URL}/api/agents`, {
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
    getAgents();
  }, []);
  return (
    <View>
      <Text
        style={{
          fontSize: 22,
          textAlign: "left",
          fontFamily: "PoppinsExtraBold",
          padding: 20,
          marginLeft: 8,
          marginTop: 20,
        }}
      >
        Reach Out To Our Agents
      </Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Image style={styles.avatar} source={{ uri: item.profile_pic }} />
            <View style={{ marginLeft: 14 }}>
              <Text style={styles.name}>{item.agent_name}</Text>
              <Text style={styles.phone}>{item.phone}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default AgentForm;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    position: "relative",
    flexDirection: "row",
    padding: 20,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  name: {
    fontSize: 18,
    fontFamily: "PoppinsSemiBold",
    marginBottom: 5,
    marginTop: 10,
  },
  phone: {
    fontSize: 15,
    fontFamily: "Poppins",
  },
});
