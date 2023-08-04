import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const AccountSettings = () => {
  return (
    <View style={{ flex: 1 }}>
      <Image
        style={{ resizeMode: "contain" }}
        source={{ uri: require("../assets/firstpage.png") }}
      />
    </View>
  );
};

export default AccountSettings;

const styles = StyleSheet.create({});
