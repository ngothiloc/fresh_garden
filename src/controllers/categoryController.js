// controllers/categoryController.js
const CategoryModel = require('../models/categoryModel');

const CategoryController = {
    renderCategories: async function (req, res) {
        try {
            const categories = await CategoryModel.getAllCategories();
            res.render('index', { categories });
        } catch (error) {
            console.error('Error rendering categories:', error);
            res.status(500).send('Server error');
        }
    },
};

module.exports = CategoryController;