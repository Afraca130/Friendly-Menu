import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
  async setItem(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error saving data:', error);
      throw error;
    }
  }

  async getItem(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error reading data:', error);
      throw error;
    }
  }

  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data:', error);
      throw error;
    }
  }

  async clear() {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing data:', error);
      throw error;
    }
  }

  async getAllKeys() {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Error getting all keys:', error);
      throw error;
    }
  }

  async multiGet(keys) {
    try {
      const pairs = await AsyncStorage.multiGet(keys);
      return pairs.map(([key, value]) => [key, JSON.parse(value)]);
    } catch (error) {
      console.error('Error getting multiple items:', error);
      throw error;
    }
  }

  async multiSet(keyValuePairs) {
    try {
      const pairs = keyValuePairs.map(([key, value]) => [
        key,
        JSON.stringify(value),
      ]);
      await AsyncStorage.multiSet(pairs);
    } catch (error) {
      console.error('Error setting multiple items:', error);
      throw error;
    }
  }
}

export default new StorageService();
