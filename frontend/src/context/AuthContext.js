import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = async (email, password) => {
    try {
      // TODO: Implement actual API call
      const response = { token: "dummy-token", user: { id: 1, email } };

      await SecureStore.setItemAsync("userToken", response.token);
      await AsyncStorage.setItem("userInfo", JSON.stringify(response.user));

      setUserToken(response.token);
      setUserInfo(response.user);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("userToken");
      await AsyncStorage.removeItem("userInfo");
      setUserToken(null);
      setUserInfo(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      // SecureStore가 사용 가능한지 확인
      const isAvailable = await SecureStore.isAvailableAsync();

      if (isAvailable) {
        const token = await SecureStore.getItemAsync("userToken");
        const userInfoString = await AsyncStorage.getItem("userInfo");

        if (token) {
          setUserToken(token);
          if (userInfoString) {
            setUserInfo(JSON.parse(userInfoString));
          }
        }
      }
    } catch (error) {
      console.error("isLoggedIn error:", error);
    } finally {
      // 약간의 지연을 줘서 스플래시 스크린이 보이도록 함
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userToken,
        userInfo,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
