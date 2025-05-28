import { useState, useEffect } from 'react';
import LocationService from '../services/location/LocationService';

const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = async () => {
    try {
      setLoading(true);
      setError(null);
      const currentLocation = await LocationService.getCurrentLocation();
      setLocation(currentLocation);
      return currentLocation;
    } catch (err) {
      setError(err.message || 'Failed to get location');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getAddress = async (latitude, longitude) => {
    try {
      setLoading(true);
      setError(null);
      const address = await LocationService.getAddressFromCoordinates(
        latitude,
        longitude,
      );
      return address;
    } catch (err) {
      setError(err.message || 'Failed to get address');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getCoordinates = async (address) => {
    try {
      setLoading(true);
      setError(null);
      const coordinates = await LocationService.getCoordinatesFromAddress(
        address,
      );
      return coordinates;
    } catch (err) {
      setError(err.message || 'Failed to get coordinates');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return {
    location,
    error,
    loading,
    getCurrentLocation,
    getAddress,
    getCoordinates,
  };
};

export default useLocation;
