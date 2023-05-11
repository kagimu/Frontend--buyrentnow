import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import HomeScreen from "../components/HomeScreen";
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
      <Stack.Screen
        name="ApartmentsBuy"
        component={ApartmentsBuy}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="ios-chevron-back"
                size={35}
                color="black"
                style={{
                  borderColor: "#fff",
                  marginTop: 25,
                  borderWidth: 1,
                  borderRadius: 15,
                  backgroundColor: "#fff",
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="CommercialBuy"
        component={CommercialBuy}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="ios-chevron-back"
                size={35}
                color="black"
                style={{
                  borderColor: "#fff",
                  marginTop: 25,
                  borderWidth: 1,
                  borderRadius: 15,
                  backgroundColor: "#fff",
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="HousesBuy"
        component={HousesBuy}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="ios-chevron-back"
                size={35}
                color="black"
                style={{
                  borderColor: "#fff",
                  marginTop: 25,
                  borderWidth: 1,
                  borderRadius: 15,
                  backgroundColor: "#fff",
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="LandBuy"
        component={LandBuy}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="ios-chevron-back"
                size={35}
                color="black"
                style={{
                  borderColor: "#fff",
                  marginTop: 25,
                  borderWidth: 1,
                  borderRadius: 15,
                  backgroundColor: "#fff",
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ApartmentsRent"
        component={ApartmentsRent}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="ios-chevron-back"
                size={35}
                color="black"
                style={{
                  borderColor: "#fff",
                  marginTop: 25,
                  borderWidth: 1,
                  borderRadius: 15,
                  backgroundColor: "#fff",
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="CommercialRent"
        component={CommercialRent}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="ios-chevron-back"
                size={35}
                color="black"
                style={{
                  borderColor: "#fff",
                  marginTop: 25,
                  borderWidth: 1,
                  borderRadius: 15,
                  backgroundColor: "#fff",
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="HousesRent"
        component={HousesRent}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="ios-chevron-back"
                size={35}
                color="black"
                style={{
                  borderColor: "#fff",
                  marginTop: 25,
                  borderWidth: 1,
                  borderRadius: 15,
                  backgroundColor: "#fff",
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="LandRent"
        component={LandRent}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="ios-chevron-back"
                size={35}
                color="black"
                style={{
                  borderColor: "#fff",
                  marginTop: 25,
                  borderWidth: 1,
                  borderRadius: 15,
                  backgroundColor: "#fff",
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="ios-chevron-back"
                size={35}
                color="black"
                style={{
                  borderColor: "#fff",
                  marginTop: 25,
                  borderWidth: 1,
                  borderRadius: 15,
                  backgroundColor: "#fff",
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="RegisterForm" component={RegisterForm} />
      <Stack.Screen name="LoginForm" component={LoginForm} />
      <Stack.Screen
        name="PostDetails"
        component={PostDetails}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="ios-chevron-back"
                size={30}
                color="black"
                style={{
                  borderColor: "#fff",
                  marginTop: 25,
                  borderWidth: 1,
                  borderRadius: 15,
                  backgroundColor: "#fff",
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="AllCategory"
        component={AllCategory}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="ios-chevron-back"
                size={35}
                color="black"
                style={{
                  borderColor: "#fff",
                  marginTop: 25,
                  borderWidth: 1,
                  borderRadius: 15,
                  backgroundColor: "#fff",
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="AllCategoryBuy"
        component={AllCategoryBuy}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="ios-chevron-back"
                size={35}
                color="black"
                style={{
                  borderColor: "#fff",
                  marginTop: 25,
                  borderWidth: 1,
                  borderRadius: 15,
                  backgroundColor: "#fff",
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="AgentForm"
        component={AgentForm}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="ios-chevron-back"
                size={30}
                color="black"
                style={{
                  borderColor: "#fff",
                  marginTop: 15,
                  borderWidth: 1,
                  borderRadius: 15,
                  backgroundColor: "#fff",
                }}
              />
            </TouchableOpacity>
          ),
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
