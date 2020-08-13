import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';
import { API_CONFIG } from "../api.config";

// Create axios client, pre-configured with baseURL
let APIKit = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000,
});

// Set JSON Web Token in Client to be included in all calls
export const clientToken = {
  setAccessToken: async(token) => {
    await AsyncStorage.setItem('accessToken', token.toString());
  },
  getAccessToken: async() => {
    return await AsyncStorage.getItem('accessToken');
  }, 
  tokenExpired: (onPressFn) => {
    Alert.alert("Token Expired",
      "Please login again the session has expired",
      [{
        text: "OK",
        onPress: onPressFn
      }]
    );
  }
};

export default APIKit;