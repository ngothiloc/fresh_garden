// routes/index.route.js
const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

// Home Route: Fetch and display categories and products
router.get('/', indexController.getHomePage);

// Product Details Route (JSON response)
router.get('/products/:id', indexController.getProductById);

module.exports = router;