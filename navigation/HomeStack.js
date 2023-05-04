import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../components/HomeScreen";
import LoginScreen from "../components/login/LoginScreen";
import RegisterScreen from "../components/login/RegisterScreen";
import BookingConfirmation from "../components/BookingConfirmation";
import PostDetails from "../components/PostDetails";
import AgentForm from "../components/AgentForm";
import Category from "../components/Category";
import ApartmentsBuy from "../components/Buy_categories/ApartmentsBuy";
import CommercialBuy from "../components/Buy_categories/CommercialBuy";
import LandBuy from "../components/Buy_categories/LandBuy";
import HousesBuy from "../components/Buy_categories/HousesBuy";
import ApartmentsRent from "../components/Rent_categories/ApartmentsRent";
import HousesRent from "../components/Rent_categories/HousesRent";
import LandRent from "../components/Rent_categories/LandRent";
import CommercialRent from "../components/Rent_categories/CommercialRent";
import AllCategory from "../components/category/AllCategory";
import AllCategoryBuy from "../components/category/AllCategoryBuy";
import EmailAlert from "../components/TopTabs/EmailAlert";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShadowVisible: false,
        headerTransparent: true,
        title: "",
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Category" component={Category} />
      <Stack.Screen name="ApartmentsBuy" component={ApartmentsBuy} />
      <Stack.Screen name="CommercialBuy" component={CommercialBuy} />
      <Stack.Screen name="HousesBuy" component={HousesBuy} />
      <Stack.Screen name="LandBuy" component={LandBuy} />
      <Stack.Screen name="ApartmentsRent" component={ApartmentsRent} />
      <Stack.Screen name="CommercialRent" component={CommercialRent} />
      <Stack.Screen name="HousesRent" component={HousesRent} />
      <Stack.Screen name="LandRent" component={LandRent} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="PostDetails" component={PostDetails} />
      <Stack.Screen name="AllCategory" component={AllCategory} />
      <Stack.Screen name="AllCategoryBuy" component={AllCategoryBuy} />
      <Stack.Screen name="AgentForm" component={AgentForm} />
      <Stack.Screen name="EmailAlert" component={EmailAlert} />

      <Stack.Screen
        name="BookingConfirmation"
        component={BookingConfirmation}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
