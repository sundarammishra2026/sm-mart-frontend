import api from './api';

export const authService = {
  register: async (userData) => {
    const response = await api.post('/Auth/register', userData);
    return response.data;
  },

  login: async (email, password) => {
    const response = await api.post('/Auth/login', { email, password });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  isAdmin: () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.role === 'Admin';
  }
};