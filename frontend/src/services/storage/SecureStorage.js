import * as SecureStore from 'expo-secure-store';

class SecureStorageService {
  async setItem(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await SecureStore.setItemAsync(key, jsonValue);
    } catch (error) {
      console.error('Error saving secure data:', error);
      throw error;
    }
  }

  async getItem(key) {
    try {
      const jsonValue = await SecureStore.getItemAsync(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error reading secure data:', error);
      throw error;
    }
  }

  async removeItem(key) {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error('Error removing secure data:', error);
      throw error;
    }
  }

  async clear() {
    try {
      // Note: SecureStore doesn't have a clear method
      // You'll need to keep track of your keys and remove them individually
      console.warn('SecureStore clear not implemented');
    } catch (error) {
      console.error('Error clearing secure data:', error);
      throw error;
    }
  }

  async isAvailable() {
    try {
      return await SecureStore.isAvailableAsync();
    } catch (error) {
      console.error('Error checking SecureStore availability:', error);
      return false;
    }
  }
}

export default new SecureStorageService();
