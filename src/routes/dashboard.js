const express = require('express');
const router = express.Router();
const ProductsController = require('../controllers/productController');
// const CategoryController = require('../controllers/categoryController');

// Route để hiển thị trang dashboard
router.get('/', (req, res) => {
    res.render('dashboard');
});

router.get('/products', ProductsController.renderProductsPage);

// router.get('/category', CategoryController.renderCategories);

module.exports = router;