import { StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SavedPage from "../components/SavedPage";
import BookingConfirmation from "../components/HomeScreen";
import HomeScreen from "../components/BookingConfirmation";
import BookingAlert from "../components/TopTabs/BookingAlert";

const Stack = createNativeStackNavigator();

const BookStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="BookingConfirmation"
      screenOptions={{ headerTransparent: true, title: "", headerShown: false }}
    >
      <Stack.Screen name="Saved Places" component={SavedPage} />
      <Stack.Screen
        name="BookingConfirmation"
        component={BookingConfirmation}
      />
      <Stack.Screen name="BookingAlert" component={BookingAlert} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};
export default BookStack;

const styles = StyleSheet.create({});
