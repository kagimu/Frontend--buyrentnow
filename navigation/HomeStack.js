import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { useEffect } from "react";
import HomeScreen from "../components/HomeScreen";
import { HeaderBackButton } from "@react-navigation/stack";
import LoginScreen from "../components/login/LoginScreen";
import RegisterScreen from "../components/login/RegisterScreen";
import BookingConfirmation from "../components/BookingConfirmation";
import PostDetails from "../components/PostDetails";
import AgentForm from "../components/AgentForm";
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
import RegisterForm from "../components/login/RegisterForm";
import LoginForm from "../components/login/LoginForm";
import BookingAlert from "../components/TopTabs/BookingAlert";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // When the HomeStack is focused, navigate to the HomeScreen
      navigation.navigate("HomeScreen");
    });

    // Return a cleanup function to remove the listener when the component unmounts
    return unsubscribe;
  }, [navigation]);

  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShadowVisible: false,
        headerTransparent: true,
        title: "",
        headerBackTitleStyle: "top:50",
        headerTitleStyle: { marginTop: 40 },
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="ApartmentsBuy"
        component={ApartmentsBuy}
        options={{
          headerBackButtonMenuEnable: true,
        }}
      />
      <Stack.Screen
        name="CommercialBuy"
        component={CommercialBuy}
        options={{
          headerBackButtonMenuEnable: true,
        }}
      />
      <Stack.Screen
        name="HousesBuy"
        component={HousesBuy}
        options={{
          headerBackButtonMenuEnable: true,
        }}
      />
      <Stack.Screen
        name="LandBuy"
        component={LandBuy}
        options={{
          headerBackButtonMenuEnable: true,
        }}
      />
      <Stack.Screen
        name="ApartmentsRent"
        component={ApartmentsRent}
        options={{
          headerBackButtonMenuEnable: true,
          headerBackTitleStyle: "top:50",
          headerTitleStyle: { marginTop: 40 },
        }}
      />
      <Stack.Screen
        name="CommercialRent"
        component={CommercialRent}
        options={{
          headerBackButtonMenuEnable: true,
        }}
      />
      <Stack.Screen
        name="HousesRent"
        component={HousesRent}
        options={{
          headerBackButtonMenuEnable: true,
        }}
      />
      <Stack.Screen
        name="LandRent"
        component={LandRent}
        options={{
          headerBackButtonMenuEnable: true,
        }}
      />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          headerBackButtonMenuEnable: true,
        }}
      />
      <Stack.Screen name="RegisterForm" component={RegisterForm} />
      <Stack.Screen name="LoginForm" component={LoginForm} />
      <Stack.Screen
        name="PostDetails"
        component={PostDetails}
        options={{
          headerBackButtonMenuEnable: true,
        }}
      />
      <Stack.Screen
        name="AllCategory"
        component={AllCategory}
        options={{
          headerBackButtonMenuEnable: true,
        }}
      />
      <Stack.Screen
        name="AllCategoryBuy"
        component={AllCategoryBuy}
        options={{
          headerBackButtonMenuEnable: true,
        }}
      />
      <Stack.Screen
        name="AgentForm"
        component={AgentForm}
        options={{
          headerBackButtonMenuEnable: true,
        }}
      />
      <Stack.Screen
        name="EmailAlert"
        component={EmailAlert}
        options={{
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="BookingAlert"
        component={BookingAlert}
        options={{
          headerLeft: () => null,
        }}
      />

      <Stack.Screen
        name="BookingConfirmation"
        component={BookingConfirmation}
        options={{
          headerLeft: () => null,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
