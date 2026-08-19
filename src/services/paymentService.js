import api from './api';

export const paymentService = {
  createOrder: async (orderId) => {
    const response = await api.post('/Payment/create-order', { orderId });
    return response.data;
  },

  verifyPayment: async (data) => {
    const response = await api.post('/Payment/verify', data);
    return response.data;
  },

  getPaymentStatus: async (transactionId) => {
    const response = await api.get(`/Payment/status/${transactionId}`);
    return response.data;
  }
};