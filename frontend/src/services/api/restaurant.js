import api from './index';

export const restaurantService = {
  getRestaurants: async (params = {}) => {
    const response = await api.get('/restaurants', { params });
    return response.data;
  },

  getRestaurantById: async (id) => {
    const response = await api.get(`/restaurants/${id}`);
    return response.data;
  },

  getRestaurantMenu: async (restaurantId) => {
    const response = await api.get(`/restaurants/${restaurantId}/menu`);
    return response.data;
  },

  getRestaurantReviews: async (restaurantId, params = {}) => {
    const response = await api.get(`/restaurants/${restaurantId}/reviews`, {
      params,
    });
    return response.data;
  },

  createReview: async (restaurantId, reviewData) => {
    const response = await api.post(
      `/restaurants/${restaurantId}/reviews`,
      reviewData,
    );
    return response.data;
  },

  searchRestaurants: async (query, params = {}) => {
    const response = await api.get('/restaurants/search', {
      params: { ...params, q: query },
    });
    return response.data;
  },

  getPopularRestaurants: async () => {
    const response = await api.get('/restaurants/popular');
    return response.data;
  },

  getNearbyRestaurants: async (latitude, longitude, radius) => {
    const response = await api.get('/restaurants/nearby', {
      params: { latitude, longitude, radius },
    });
    return response.data;
  },
};
