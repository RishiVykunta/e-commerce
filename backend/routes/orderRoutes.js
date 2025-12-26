const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  createRazorpayOrder,
  verifyRazorpayPayment,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');

router.post('/create-razorpay-order', protect, createRazorpayOrder);
router.post('/verify-razorpay-payment', protect, verifyRazorpayPayment);
router.post('/', protect, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/', protect, admin, getAllOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;

