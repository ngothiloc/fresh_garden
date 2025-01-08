// controllers/categoryController.js
const path = require('path');
const CategoryModel = require('../models/categoryModel');

const CategoryController = {
    renderCategories: async function (req, res) {
        try {
            const categories = await CategoryModel.getAllCategories();
            const { name } = req.query;

            res.render('dashboard_categories', {
                title: 'Categories Dashboard',
                categories,
                searchQuery: name || ''
            });
        } catch (error) {
            console.error('Error rendering categories:', error);
            res.status(500).send('Server error');
        }
    },

    renderAddCategoryPage: async function (req, res) {
        try {
            // Truyền cả `products` và `categories` vào view
            res.render('dashboard_add_categories', {
                title: 'Add Categories Dashboard',
            });
        } catch (error) {
            console.error('Error fetching products or categories:', error);
            res.status(500).send('Server error');
        }
    },

    addCategories: async function (req, res) {
        try {
            const { name, category, price } = req.body;
            const imageFileName = req.file ? req.file.filename : null; // Lấy tên file ảnh từ multer

            // Nếu có ảnh, tạo đường dẫn đầy đủ
            const imagePath = imageFileName
                ? path.join('/assets/images/products', imageFileName) // Đường dẫn đầy đủ cho ảnh
                : null;

            // Gọi model để thêm sản phẩm
            await CategoryModel.addCategories({
                name,
                image: imagePath, // Lưu đường dẫn ảnh đầy đủ vào cơ sở dữ liệu
            });

            res.redirect('/dashboard/categories'); // Quay lại danh sách sản phẩm
        } catch (error) {
            console.error('Error adding categories:', error);
            res.status(500).send('Error adding categories');
        }
    },

    searchCategories: async function (req, res) {
        try {
            const { name } = req.query; // Lấy tên sản phẩm từ query string            

            // Tìm kiếm sản phẩm theo tên nếu có
            const categories = await CategoryModel.searchCategoriesByName(name);

            // Trả về kết quả tìm kiếm
            res.render('dashboard_categories', {
                title: 'Categories Dashboard',
                categories,
                searchQuery: name || ''
            });
        } catch (error) {
            console.error('Error searching categories:', error);
            res.status(500).send('Error searching categories');
        }
    }
};

module.exports = CategoryController;