// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');
const upload = require('../middleware/upload');

// Route để hiển thị trang danh sách danh mục
router.get('/', OrderController.renderOrder);

// Route tìm kiếm sản phẩm theo tên
router.get('/search', OrderController.searchOrder);

module.exports = router;