import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import Tab from "./Tab";
import { CommonActions } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const TabBar = ({ state, navigation }) => {
  const [selected, setSelected] = useState("Home");
  const { routes } = state;
  const renderColor = (currentTab) =>
    currentTab === selected ? "#387981" : "#000";

  const handlePress = (activeTab, index) => {
    if (state.index !== index) {
      setSelected(activeTab);

      // Reset the navigation stack to the initial screen of the selected tab
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: activeTab }],
        })
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "position" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      style={styles.wrapper}
    >
      <View style={styles.container}>
        {routes.map((route, index) => (
          <Tab
            tab={route}
            icon={route.params.icon}
            onPress={() => handlePress(route.name, index)}
            color={renderColor(route.name)}
            key={route.key}
          />
        ))}
      </View>
    </KeyboardAvoidingView>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: "1%",
    width: "100%",
    zIndex: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    width: width * 0.8,
    borderRadius: 10,
    elevation: 6,
  },
});
