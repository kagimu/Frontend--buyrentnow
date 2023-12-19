import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import BookingConfirmation from "../components/BookingConfirmation";
import ImageUploader from "../components/ImageUploader";
import BookingAlert from "../components/TopTabs/BookingAlert";
import HomeScreen from "../components/HomeScreen";
import ImageSelector from "../components/ImageSelector";
import CallUs from "../components/CallUs";

const Stack = createNativeStackNavigator();

const CategoryStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="CallUs"
      screenOptions={{
        headerShadowVisible: false,
        headerTransparent: true,
        title: "",
      }}
    >
      <Stack.Screen name="ImageUploader" component={ImageUploader} />
      <Stack.Screen name="ImageSelector" component={ImageSelector} />
      <Stack.Screen
        name="BookingConfirmation"
        component={BookingConfirmation}
      />
      <Stack.Screen name="BookingAlert" component={BookingAlert} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CallUs" component={CallUs} />
    </Stack.Navigator>
  );
};

export default CategoryStack;

const styles = StyleSheet.create({});
