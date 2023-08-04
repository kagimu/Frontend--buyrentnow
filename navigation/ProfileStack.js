import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import ProfileScreen from "../components/ProfileScreen";
import AccountSettings from "../components/AccountSettings";
import PostDetails from "../components/PostDetails";

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        title: "",
        cardStyle: { backgroundColor: "#fff" },
      }}
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="AccountSettings" component={AccountSettings} />
      <Stack.Screen name="PostDetails" component={PostDetails} />
    </Stack.Navigator>
  );
};
export default ProfileStack;

const styles = StyleSheet.create({});
