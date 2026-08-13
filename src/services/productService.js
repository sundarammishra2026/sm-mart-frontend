import api from './api';

export const productService = {
  getAll: async () => {
    const response = await api.get('/Product');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/Product/${id}`);
    return response.data;
  },

  getByCategory: async (categoryId) => {
    const response = await api.get(`/Product/category/${categoryId}`);
    return response.data;
  },

  search: async (query) => {
    const response = await api.get(`/Product/search?q=${query}`);
    return response.data;
  },

  create: async (productData) => {
    const response = await api.post('/Product', productData);
    return response.data;
  },

  update: async (id, productData) => {
    const response = await api.put(`/Product/${id}`, productData);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/Product/${id}`);
  },

  updateStock: async (id, quantity) => {
    const response = await api.patch(`/Product/${id}/stock`, { quantity });
    return response.data;
  }
};