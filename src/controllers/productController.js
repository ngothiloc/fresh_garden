const path = require('path');
const ProductModel = require('../models/productModel');

const ProductsController = {
    renderProductsPage: async function (req, res) {
        try {
            // Lấy danh sách sản phẩm và danh mục
            const products = await ProductModel.getAllProducts();
            const categories = await ProductModel.getCategories();

            // Truyền cả `products` và `categories` vào view
            res.render('dashboard_products', {
                title: 'Products Dashboard',
                products,
                categories
            });
        } catch (error) {
            console.error('Error fetching products or categories:', error);
            res.status(500).send('Server error');
        }
    },

    renderAddProductPage: async function (req, res) {
        try {
            // Lấy danh sách sản phẩm và danh mục
            const categories = await ProductModel.getCategories();

            // Truyền cả `products` và `categories` vào view
            res.render('dashboard_add_products', {
                title: 'Add Products Dashboard',
                categories
            });
        } catch (error) {
            console.error('Error fetching products or categories:', error);
            res.status(500).send('Server error');
        }
    },

    addProduct: async function (req, res) {
        try {
            const { name, category, price } = req.body;
            const imageFileName = req.file ? req.file.filename : null; // Lấy tên file ảnh từ multer

            // Nếu có ảnh, tạo đường dẫn đầy đủ
            const imagePath = imageFileName
                ? path.join('/assets/images/products', imageFileName) // Đường dẫn đầy đủ cho ảnh
                : null;

            // Gọi model để thêm sản phẩm
            await ProductModel.addProduct({
                name,
                category,
                price,
                image: imagePath, // Lưu đường dẫn ảnh đầy đủ vào cơ sở dữ liệu
            });

            res.redirect('/dashboard/products'); // Quay lại danh sách sản phẩm
        } catch (error) {
            console.error('Error adding product:', error);
            res.status(500).send('Error adding product');
        }
    }
};

module.exports = ProductsController;