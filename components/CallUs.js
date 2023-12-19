import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Dimensions } from "react-native";
import { Linking } from "react-native";
import Modal from "react-native-modal";
import tw from "twrnc";
import { FontAwesome } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const CallUs = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleCallOwner = (phoneNumbers) => {
    if (phoneNumbers && phoneNumbers.length > 0) {
      setModalVisible(true);
    } else {
      console.warn("Phone numbers are not available");
    }
  };

  const callNumber = (phoneNumber) => {
    const formattedPhoneNumber = `tel:${phoneNumber}`;
    Linking.openURL(formattedPhoneNumber)
      .then((supported) => {
        if (!supported) {
          console.log("Phone number is not supported");
        }
      })
      .catch((err) => console.error("Error opening phone app:", err))
      .finally(() => setModalVisible(false));
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 70 }}>
      <Text style={styles.heading}>
        List your rental, link up with leads effortlessly
      </Text>
      <View style={{ top: 10 }}>
        <Image
          style={styles.image}
          source={require("../assets/MaskGroup1.png")}
        />
      </View>
      <View>
        <Text style={styles.subheading}>
          To enlist your rental property today, kindly reach out to us, and our
          dedicated team will provide prompt and expert assistance.
        </Text>
      </View>
      <View>
        <Text
          style={[tw` text-center rounded-full`, styles.Button]}
          onPress={() => handleCallOwner(["123-456-7890", "987-654-3210"])}
        >
          Call us
        </Text>
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            Call us on any of the contacts below :
          </Text>
          {/* Add your phone number options here */}
          <TouchableOpacity
            style={{ flexDirection: "row", padding: 10 }}
            onPress={() => callNumber("0780 235727")}
          >
            <FontAwesome name="phone" size={24} color="#25749b" />
            <Text style={styles.modalOption}>0780 235727</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: "row", padding: 10 }}
            onPress={() => callNumber("0750 662136")}
          >
            <FontAwesome name="phone" size={24} color="#25749b" />
            <Text style={styles.modalOption}>0750 662136</Text>
          </TouchableOpacity>
          <Text
            style={styles.modalCancel}
            onPress={() => setModalVisible(false)}
          >
            Cancel
          </Text>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default CallUs;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
    marginBottom: 10,
  },
  modalOption: {
    fontSize: 16,
    left: 10,
    fontFamily: "Poppins",
    marginBottom: 10,
    color: "#808080", // Change the text color
  },
  modalCancel: {
    fontFamily: "Poppins",
    fontSize: 16,
    color: "black", // Change the text color
  },
  heading: {
    fontSize: 25,
    fontFamily: "PoppinsExtraBold",
    paddingLeft: 5,
    justifyContent: "center",
    textAlign: "center",
    top: 50,
  },
  image: {
    resizeMode: "contain",
    aspectRatio: 7 / 8,
    alignItems: "center",
    left: 20,
  },
  subheading: {
    top: -30,
    fontSize: 15,
    fontFamily: "Poppins",
    marginHorizontal: 20,
    justifyContent: "center",
    textAlign: "center",
    color: "#5e5e5f",
  },
  Button: {
    marginHorizontal: width * 0.3,
    backgroundColor: "#25749b",
    color: "white",
    padding: height * 0.025,
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
});
