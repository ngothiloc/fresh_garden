const express = require('express');
const router = express.Router();
const productsRoute = require('./products');
const categoriesRoute = require('./categories');
const orderRoute = require('./order');

// Route để hiển thị trang dashboard
router.get('/', (req, res) => {
    res.render('dashboard');
});

// Sử dụng các route của products
router.use('/products', productsRoute);

// Sử dụng các route của categories
router.use('/categories', categoriesRoute);

// Sử dụng các route của order
router.use('/order', orderRoute);


module.exports = router;