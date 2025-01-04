// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

// Định nghĩa route DELETE để xóa sản phẩm theo id
router.delete('/products/:id', ProductController.deleteProduct);

// Route để hiển thị trang thêm sản phẩm
router.get('/add-products', DashboardController.renderAddProductPage);

// Route để xử lý việc thêm sản phẩm mới
router.post('/add-products', DashboardController.addProduct);

module.exports = router;