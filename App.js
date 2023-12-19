import React, { useState, useEffect, useCallback } from "react";
import {
  LogBox,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import * as WebBrowser from "expo-web-browser";
import { useFonts } from "expo-font";

import GlobalStyles from "./GlobalStyles";
import TabNavigator from "./navigation/TabNavigator";
import LoginScreen from "./components/login/LoginScreen";
import OnboardingScreen from "./components/OnboardingScreen";
import RegisterScreen from "./components/login/RegisterScreen";
import { store, persistor } from "./redux/store";
import FontLoader from "./FontLoader";
import { all } from "axios";

SplashScreen.preventAutoHideAsync();
WebBrowser.maybeCompleteAuthSession();

LogBox.ignoreLogs(["Setting a timer"]);
const { width, height } = Dimensions.get("window");
const Stack = createNativeStackNavigator();

export default function App() {
  const [token, setToken] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const retrieveData = async () => {
    try {
      const data = await AsyncStorage.getItem("keepLoggedIn");
      console.log(data);
      setIsLogged(data);
    } catch (error) {}
  };
  const [fontsLoaded] = useFonts({
    Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
    PoppinsExtraBold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    PoppinsSemiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken !== null) {
        setToken(storedToken);
      }
    };
    checkToken();
    retrieveData();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <FontLoader />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ header: () => null }}>
              <>
                {isLogged ? (
                  <>
                    <Stack.Screen
                      name="TabNavigator"
                      component={TabNavigator}
                    />
                  </>
                ) : (
                  <>
                    <Stack.Screen
                      name="Onboarding"
                      component={OnboardingScreen}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="Login"
                      component={LoginScreen}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="RegisterScreen"
                      component={RegisterScreen}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="TabNavigator"
                      component={TabNavigator}
                      options={{ headerShown: false }}
                    />
                  </>
                )}
              </>
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
}
