import api from './api';

export const reviewService = {
  getProductReviews: async (productId) => {
    const response = await api.get(`/reviews/product/${productId}`);
    return response.data;
  },

  getUserReview: async (productId) => {
    const response = await api.get(`/reviews/product/${productId}/user`);
    return response.data;
  },

  createReview: async (reviewData) => {
    const response = await api.post('/reviews', reviewData);
    return response.data;
  },

  deleteReview: async (productId) => {
    const response = await api.delete(`/reviews/${productId}`);
    return response.data;
  },
};



