import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseUrl = `https://68f0-41-210-143-73.ngrok-free.app/api`;

const request = () => {
  const client = axios.create({
    baseURL: baseUrl,
  });
  console.log(`client`, client);
  console.log(`baseUrl`, baseUrl);
  return client;
};

const get = async (endpoint) => {
  try {
    const headers = await getHeader();
    const response = request()
      .get(endpoint, headers)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        throw error;
      });
    return response;
  } catch (err) {
    throw err;
  }
};

const post = async (endpoint, data, isMultipart = false) => {
  try {
    const headers = await getHeader(isMultipart);
    const response = request()
      .post(endpoint, data, headers)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        if (error && error.response && error.response.data)
          throw error.response.data;
        throw error;
      });
    return response;
  } catch (err) {
    throw err;
  }
};

const put = async (endpoint, data, isMultipart = false) => {
  try {
    const headers = await getHeader(isMultipart);
    const response = request()
      .put(endpoint, data, headers)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        if (error && error.response && error.response.data)
          throw error.response.data;
        throw error;
      });
    return response;
  } catch (err) {
    throw err;
  }
};

const deleteRequest = async (endpoint) => {
  try {
    const headers = await getHeader();
    const response = request()
      .delete(endpoint, headers)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        if (error && error.response && error.response.data)
          throw error.response.data;
        throw error;
      });
    return response;
  } catch (err) {
    throw err;
  }
};

const getHeader = async (isMultipart = false) => {
  try {
    const bearerToken = await getAuthToken();

    const contentType = isMultipart
      ? "multipart/form-data"
      : "application/json";
    const headers = {
      headers: {
        Accept: "application/json",
        "Content-Type": contentType,
        Authorization: "Bearer " + bearerToken,
      },
    };
    return headers;
  } catch (err) {
    throw err;
  }
};

const getAuthToken = async () => {
  try {
    let authToken = await AsyncStorage.getItem("token");
    console.log(`Auth token: ${authToken}`);
    return authToken;
  } catch (err) {
    throw err;
  }
};

export { get, post, put, deleteRequest };
