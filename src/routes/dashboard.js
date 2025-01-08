const express = require('express');
const router = express.Router();
const productsRoute = require('./products');
const categoriesRoute = require('./categories');

// Route để hiển thị trang dashboard
router.get('/', (req, res) => {
    res.render('dashboard');
});

// Sử dụng các route của products
router.use('/products', productsRoute);

// Sử dụng các route của categories
router.use('/categories', categoriesRoute);


module.exports = router;