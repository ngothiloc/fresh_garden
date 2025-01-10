// controllers/index.controller.js
const indexModel = require('../models/indexModel');

// Home Controller: Fetch and display categories and products
exports.getHomePage = async (req, res) => {
    try {
        const { categories, products } = await indexModel.fetchCategoriesAndProducts();
        const selectedProduct = products.length ? products[0] : null;

        res.render('index', {
            categories,
            products,
            selectedProduct
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Product Details Controller (JSON response)
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await indexModel.fetchProductById(id);
        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(404).send('Product not found');
    }
};