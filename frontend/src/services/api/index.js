import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

const API_URL = 'http://localhost:3000/api'; // Change this to your actual API URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle token refresh here if needed
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Implement token refresh logic here
        // const refreshToken = await SecureStore.getItemAsync('refreshToken');
        // const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
        // await SecureStore.setItemAsync('userToken', response.data.token);
        // originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
        // return api(originalRequest);
      } catch (refreshError) {
        // Handle refresh token error
        await SecureStore.deleteItemAsync('userToken');
        await AsyncStorage.removeItem('userInfo');
        // Navigate to login screen or handle logout
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
