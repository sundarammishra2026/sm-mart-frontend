import api from './api';  // ✅ Correct path (./api not ./api.js)

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/Auth/login', { email, password });
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/Auth/register', userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  isAdmin: () => {
    try {
      const user = localStorage.getItem('user');
      if (!user) return false;
      const parsed = JSON.parse(user);
      return parsed?.role === 'Admin';
    } catch {
      return false;
    }
  }
};