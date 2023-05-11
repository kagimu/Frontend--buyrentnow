import React, { useState } from "react";
import { useFonts } from "expo-font";
import { LogBox, SafeAreaView, StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./navigation/TabNavigator";
import "react-native-gesture-handler";
import GlobalStyles from "./GlobalStyles";
import LoginScreen from "./components/login/LoginScreen";
import OnboardingScreen from "./components/OnboardingScreen";
import RegisterScreen from "./components/login/RegisterScreen";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect } from "react";
import { Dimensions } from "react-native";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

SplashScreen.preventAutoHideAsync();

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

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { width, height } = Dimensions.get("window");

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (token !== null) {
        setIsLoggedIn(true);
      }
    };
    checkToken();
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
    <View
      style={{
        width,
        height,
      }}
      onLayout={onLayoutRootView}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName={isLoggedIn ? "TabNavigator" : "Onboarding"}
                screenOptions={{ headerShown: false }}
              >
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                <Stack.Screen
                  name="Login"
                  component={LoginScreen}
                  options={{ header: () => null }}
                />
                <Stack.Screen
                  name="RegisterScreen"
                  component={RegisterScreen}
                />
                <Stack.Screen
                  name="TabNavigator"
                  component={TabNavigator}
                  options={({ navigation }) => ({
                    header: () => null,
                  })}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </PersistGate>
      </Provider>
    </View>
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
