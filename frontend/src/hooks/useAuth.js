import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { authService } from '../services/api/auth';
import SecureStorage from '../services/storage/SecureStorage';
import AsyncStorage from '../services/storage/AsyncStorage';

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      await SecureStorage.setItem('userToken', response.token);
      await AsyncStorage.setItem('userInfo', response.user);
      context.login(response.token, response.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      await SecureStorage.setItem('userToken', response.token);
      await AsyncStorage.setItem('userInfo', response.user);
      context.login(response.token, response.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      await SecureStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userInfo');
      context.logout();
    } catch (error) {
      throw error;
    }
  };

  const updateProfile = async (userData) => {
    try {
      const response = await authService.updateProfile(userData);
      await AsyncStorage.setItem('userInfo', response.user);
      context.updateUser(response.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    ...context,
    login,
    register,
    logout,
    updateProfile,
  };
};

export default useAuth;
