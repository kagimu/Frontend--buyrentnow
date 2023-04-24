import React, { useState } from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { LogBox, SafeAreaView, StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./navigation/TabNavigator";
import "react-native-gesture-handler";
import GlobalStyles from "./GlobalStyles";
import LoginScreen from "./components/login/LoginScreen";
import OnboardingScreen from "./components/OnboardingScreen";
import { AntDesign } from "@expo/vector-icons";
import RegisterScreen from "./components/login/RegisterScreen";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
  " expo-app-loading is deprecated in favor of expo-splash-screen: use SplashScreen.preventAutoHideAsync() and SplashScreen.hideAsync() instead. https://docs.expo.dev/versions/latest/sdk/splash-screen/ ",
]);

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
    PoppinsExtraBold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
    PoppinsSemiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="TabNavigator">
              <Stack.Screen
                name="Onboarding"
                component={OnboardingScreen}
                options={{ header: () => null }}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ header: () => null }}
              />
              <Stack.Screen
                name="TabNavigator"
                component={TabNavigator}
                options={({ navigation }) => ({
                  header: () => null,
                  headerLeft: () => (
                    <AntDesign
                      name="leftcircle"
                      size={24}
                      color="black"
                      onPress={() => {
                        navigation.goBack();
                      }}
                    />
                  ),
                })}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
