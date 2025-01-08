const express = require('express');
const router = express.Router();
const productsRoute = require('./products');

// Route để hiển thị trang dashboard
router.get('/', (req, res) => {
    res.render('dashboard');
});

// Sử dụng các route của products
router.use('/products', productsRoute);

module.exports = router;