// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const ProductsController = require('../controllers/productController');
const upload = require('../middleware/upload');


// Route để hiển thị trang danh sách sản phẩm
router.get('/', ProductsController.renderProductsPage);

// Route để hiển thị trang thêm sản phẩm
router.get('/add_products', ProductsController.renderAddProductPage);

// Route để xử lý thêm sản phẩm
router.post('/add', upload.single('image'), ProductsController.addProduct);

// Route tìm kiếm sản phẩm theo tên
router.get('/search', ProductsController.searchProducts);

module.exports = router;