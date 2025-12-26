import api from './api';

export const orderService = {
  createOrder: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  getMyOrders: async () => {
    const response = await api.get('/orders/myorders');
    return response.data;
  },

  getAllOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  },

  getOrderById: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  updateOrderStatus: async (id, status) => {
    const response = await api.put(`/orders/${id}/status`, { status });
    return response.data;
  },

  createRazorpayOrder: async (amount) => {
    const response = await api.post('/orders/create-razorpay-order', { amount });
    return response.data;
  },

  verifyRazorpayPayment: async (paymentData) => {
    const response = await api.post('/orders/verify-razorpay-payment', paymentData);
    return response.data;
  },
};

