// routes/index.route.js
const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const orderController = require('../controllers/orderController');

// Home Route: Fetch and display categories and products
router.get('/', indexController.getHomePage);

// Route để hiển thị trang checkout
router.get('/checkout', orderController.getHomePage);

// Route để xử lý đơn hàng mới (POST)
router.post('/checkout', orderController.createOrder);

// Product Details Route (JSON response)
router.get('/products/:id', indexController.getProductById);

module.exports = router;