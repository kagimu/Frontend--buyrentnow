import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import axios from "axios";
import { BASE_URL } from "@env";
import { getToken } from "./login/token";
import { AntDesign } from "@expo/vector-icons";

const Likes = ({ user_id, post_id }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async (post_id, event) => {
    event.persist();
    const token = await getToken();
    axios
      .post(
        `${BASE_URL}/api/posts/${post_id}/like`, // remove extra slash from URL and replace {id} with post_id variable
        {
          user_id: user_id,
          post_id: post_id,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setIsLiked(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View>
      <TouchableOpacity onPress={(event) => handleLike(post_id, event)}>
        {isLiked ? (
          <AntDesign
            name="heart"
            color="#fff"
            size={40}
            style={{ position: "absolute", top: 15, left: 290 }}
          />
        ) : (
          <AntDesign
            name="hearto"
            color="#fff"
            size={40}
            style={{ position: "absolute", top: 15, left: 290 }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Likes;

const styles = StyleSheet.create({});
