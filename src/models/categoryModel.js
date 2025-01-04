const fetch = require('node-fetch');

const API_URL = 'http://localhost:3000/category';

const CategoryModel = {
    getAllCategories: async function () {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to fetch categories');
            return await response.json();
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    },
};

module.exports = CategoryModel;