import api from './index';

export const reservationService = {
  createReservation: async (reservationData) => {
    const response = await api.post('/reservations', reservationData);
    return response.data;
  },

  getReservations: async (params = {}) => {
    const response = await api.get('/reservations', { params });
    return response.data;
  },

  getReservationById: async (id) => {
    const response = await api.get(`/reservations/${id}`);
    return response.data;
  },

  updateReservation: async (id, reservationData) => {
    const response = await api.put(`/reservations/${id}`, reservationData);
    return response.data;
  },

  cancelReservation: async (id) => {
    const response = await api.delete(`/reservations/${id}`);
    return response.data;
  },

  getAvailableTimeSlots: async (restaurantId, date, partySize) => {
    const response = await api.get('/reservations/available-slots', {
      params: { restaurantId, date, partySize },
    });
    return response.data;
  },

  getUpcomingReservations: async () => {
    const response = await api.get('/reservations/upcoming');
    return response.data;
  },

  getPastReservations: async () => {
    const response = await api.get('/reservations/past');
    return response.data;
  },
};
