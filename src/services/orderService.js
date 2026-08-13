import api from './api';

export const orderService = {
  getAll: async () => {
    const response = await api.get('/Order');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/Order/${id}`);
    return response.data;
  },

  create: async (orderData) => {
    const response = await api.post('/Order', orderData);
    return response.data;
  },

  updateStatus: async (id, status) => {
    const response = await api.put(`/Order/${id}/status`, { status });
    return response.data;
  },

  updateTracking: async (id, trackingNumber) => {
    const response = await api.put(`/Order/${id}/tracking`, { trackingNumber });
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/Order/${id}`);
  }
};