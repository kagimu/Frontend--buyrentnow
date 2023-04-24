import React from "react";
import { StyleSheet, StatusBar } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ApartmentsRent from "./Rent_categories/ApartmentsRent";
import CommercialRent from "./Rent_categories/CommercialRent";
import HousesRent from "./Rent_categories/HousesRent";
import LandRent from "./Rent_categories/LandRent";
import AllCategory from "./category/AllCategory";

const Tab = createMaterialTopTabNavigator();

const Category = () => {
  return (
    <Tab.Navigator
      initialRouteName="ALL"
      screenOptions={{
        tabBarGap: 10,
        tabBarIndicatorStyle: {
          backgroundColor: "#fff",
          color: "#387981",
          height: 0,
        },
        tabBarActiveTintColor: "#387981",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          textTransform: "uppercase",
          width: 500,
          marginLeft: 2,
          padding: 10,
          color: "#000",
        },
      }}
    >
      <Tab.Screen
        name="ALL"
        component={AllCategory}
        options={{ tabBarLabel: "ALL" }}
      />
      <Tab.Screen
        name="LAND"
        component={LandRent}
        options={{ tabBarLabel: "Land" }}
      />
      <Tab.Screen
        name="APARTMENTS"
        component={ApartmentsRent}
        options={{ tabBarLabel: "Apartments" }}
      />
      <Tab.Screen
        name="HOUSES"
        component={HousesRent}
        options={{ tabBarLabel: "Houses" }}
      />
      <Tab.Screen
        name="COMMERCIAL"
        component={CommercialRent}
        options={{ tabBarLabel: "Commercial" }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 15,
  },
});

export default Category;
