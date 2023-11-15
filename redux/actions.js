import { BASE_URL } from "@env";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define action types
export const GET_BOOKS = "GET_BOOKS";
export const ADD_TO_BOOKMARK_LIST = "ADD_TO_BOOKMARK_LIST";
export const REMOVE_FROM_BOOKMARK_LIST = "REMOVE_FROM_BOOKMARK_LIST";

export const addBookmark = (book) => (dispatch) => {
  dispatch({
    type: ADD_TO_BOOKMARK_LIST,
    payload: book,
  });
};

export const removeBookmark = (book) => (dispatch) => {
  dispatch({
    type: REMOVE_FROM_BOOKMARK_LIST,
    payload: book,
  });
};

export const getBooks = () => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`https://propatizadmin.com/api/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data) {
        dispatch({
          type: GET_BOOKS,
          payload: response.data,
        });
      } else {
        console.log("Unable to fetch data from the API BASE URL!");
      }
    } catch (error) {
      console.log(error);
      // Add custom logic to handle errors
    }
  };
};
