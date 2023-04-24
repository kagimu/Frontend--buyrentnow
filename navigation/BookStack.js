import { StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Posts from "../components/Posts";
import MyProfile from "../components/MyProfile";
import SavedPage from "../components/SavedPage";

const Stack = createNativeStackNavigator();

const BookStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Posts"
      screenOptions={{ headerTransparent: true, title: "" }}
    >
      <Stack.Screen name="Saved Places" component={SavedPage} />
    </Stack.Navigator>
  );
};
export default BookStack;

const styles = StyleSheet.create({});
