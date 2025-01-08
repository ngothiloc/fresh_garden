// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');
const upload = require('../middleware/upload');

// Route để hiển thị trang danh sách danh mục
router.get('/', CategoryController.renderCategories);

// Route để hiển thị trang thêm danh mục
router.get('/add_categories', CategoryController.renderAddCategoryPage);

// Route để xử lý thêm danh mục
router.post('/add', upload.single('image'), CategoryController.addCategories);

// Route tìm kiếm danh mục
router.get('/search', CategoryController.searchCategories);


module.exports = router;