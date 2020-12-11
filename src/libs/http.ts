import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

axios.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");

    config.headers = {
      Authorization: token ? `Bearer ${token}` : null,
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    return config;
  },
  (error) => Promise.reject(error)
);

export const getSource = () => axios.CancelToken.source();

export default axios;
