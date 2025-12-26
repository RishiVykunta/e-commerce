const express = require('express');
const router = express.Router();
const {
  getProductReviews,
  createReview,
  deleteReview,
  getUserReview,
} = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

router.get('/product/:productId', getProductReviews);
router.get('/product/:productId/user', protect, getUserReview);
router.post('/', protect, createReview);
router.delete('/:productId', protect, deleteReview);

module.exports = router;

