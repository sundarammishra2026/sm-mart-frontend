import api from './api';

export const categoryService = {
  getAll: async () => {
    const response = await api.get('/Category');
    return response.data;
  },

  getActive: async () => {
    const response = await api.get('/Category/active');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/Category/${id}`);
    return response.data;
  },

  getProductsByCategory: async (id) => {
    const response = await api.get(`/Category/${id}/products`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/Category', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/Category/${id}`, data);
    return response.data;
  },

  toggleStatus: async (id, isActive) => {
    const response = await api.patch(`/Category/${id}/status`, { isActive });
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/Category/${id}`);
  }
};