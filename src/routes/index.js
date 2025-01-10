const express = require('express');
const axios = require('axios');
const router = express.Router();

const CATEGORY_API_URL = 'http://localhost:3000/category';
const PRODUCT_API_URL = 'http://localhost:3000/products';

// Home Route: Fetch and display categories and products
router.get('/', async (req, res) => {
    try {
        const [categoriesResponse, productsResponse] = await Promise.all([
            axios.get(CATEGORY_API_URL),
            axios.get(PRODUCT_API_URL)
        ]);

        const categories = categoriesResponse.data;
        const products = productsResponse.data;
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
});

// Product Details Route (JSON response)
router.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = (await axios.get(`${PRODUCT_API_URL}/${id}`)).data;
        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(404).send('Product not found');
    }
});

// // Search Products by Query
// router.get('/search', async (req, res) => {
//     const { q: query } = req.query;

//     try {
//         const products = (await axios.get(PRODUCT_API_URL)).data;
//         const filteredProducts = products.filter(product =>
//             product.name.toLowerCase().includes(query.toLowerCase())
//         );

//         res.render('search', {
//             title: 'Search Results',
//             products: filteredProducts
//         });
//     } catch (error) {
//         console.error('Error fetching search results:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

module.exports = router;