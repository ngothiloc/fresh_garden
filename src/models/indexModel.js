// models/index.model.js
const axios = require('axios');

const CATEGORY_API_URL = 'http://localhost:3000/category';
const PRODUCT_API_URL = 'http://localhost:3000/products';

// Fetch categories and products from the API
exports.fetchCategoriesAndProducts = async () => {
    try {
        const [categoriesResponse, productsResponse] = await Promise.all([
            axios.get(CATEGORY_API_URL),
            axios.get(PRODUCT_API_URL)
        ]);

        const categories = categoriesResponse.data;
        const products = productsResponse.data;

        return { categories, products };
    } catch (error) {
        console.error('Error fetching categories and products:', error);
        throw new Error('Error fetching categories and products');
    }
};

// Fetch a product by ID
exports.fetchProductById = async (id) => {
    try {
        const response = await axios.get(`${PRODUCT_API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw new Error('Error fetching product');
    }
};