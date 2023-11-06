import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import BookingConfirmation from "../components/BookingConfirmation";
import ImageUploader from "../components/ImageUploader";
import BookingAlert from "../components/TopTabs/BookingAlert";
import HomeScreen from "../components/HomeScreen";

const Stack = createNativeStackNavigator();

const CategoryStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="BookingConfirmation"
      screenOptions={{
        headerShadowVisible: false,
        headerTransparent: true,
        title: "",
      }}
    >
      <Stack.Screen name="ImageUploader" component={ImageUploader} />
      <Stack.Screen
        name="BookingConfirmation"
        component={BookingConfirmation}
      />
      <Stack.Screen name="BookingAlert" component={BookingAlert} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default CategoryStack;

const styles = StyleSheet.create({});
