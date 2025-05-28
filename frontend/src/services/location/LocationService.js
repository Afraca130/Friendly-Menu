import * as Location from 'expo-location';

class LocationService {
  async requestPermissions() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Location permission not granted');
    }
  }

  async getCurrentLocation() {
    try {
      await this.requestPermissions();
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      return location;
    } catch (error) {
      console.error('Error getting location:', error);
      throw error;
    }
  }

  async getAddressFromCoordinates(latitude, longitude) {
    try {
      const [address] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      return address;
    } catch (error) {
      console.error('Error getting address:', error);
      throw error;
    }
  }

  async getCoordinatesFromAddress(address) {
    try {
      const coordinates = await Location.geocodeAsync(address);
      return coordinates[0];
    } catch (error) {
      console.error('Error getting coordinates:', error);
      throw error;
    }
  }

  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }

  toRad(value) {
    return (value * Math.PI) / 180;
  }
}

export default new LocationService();
