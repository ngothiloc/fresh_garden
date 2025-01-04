const ProductModel = require('../models/productModel');
const ProductsController = {
    renderProductsPage: async function (req, res) {
        try {
            // Lấy danh sách sản phẩm và danh mục
            const products = await ProductModel.getAllProducts();
            const categories = await ProductModel.getCategories(); // Lấy danh mục từ API hoặc DB

            // Truyền cả `products` và `categories` vào view
            res.render('dashboard_products', {
                title: 'Products Dashboard',
                products,
                categories // Đảm bảo categories là một mảng riêng biệt
            });
        } catch (error) {
            console.error('Error fetching products or categories:', error);
            res.status(500).send('Server error');
        }
    },
};

module.exports = ProductsController;