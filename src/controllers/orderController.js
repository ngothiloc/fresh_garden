const OrderModel = require('../models/orderModel');
const indexModel = require('../models/indexModel');

const OrderController = {
    createOrder: async function (req, res) {
        try {
            const { full_name, phone_number, address, payment_method, cart } = req.body;

            if (!cart || cart.length === 0) {
                return res.status(400).send("Cart is empty");
            }

            const orderData = { full_name, phone_number, address, payment_method, cart };
            await OrderModel.createOrder(orderData);
            res.status(201).send("Order created successfully");
        } catch (error) {
            console.error("Error creating order:", error);
            res.status(500).send("Failed to create order");
        }
    },

    // Home Controller: Fetch and display categories and products
    getHomePage: async function (req, res) {
        try {
            const { categories } = await indexModel.fetchCategoriesAndProducts();

            res.render('checkout', {
                categories
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    renderOrder: async function (req, res) {
        try {
            const orders = await OrderModel.getAllOrder();
            const { categories, products } = await indexModel.fetchCategoriesAndProducts();
            const { name } = req.query;

            res.render('dashboard_order', {
                title: 'Order Dashboard',
                orders,
                categories,
                products,
                searchQuery: name || ''
            });
        } catch (error) {
            console.error('Error rendering order:', error);
            res.status(500).send('Server error');
        }
    },

    // Tìm kiếm sản phẩm theo tên
    searchOrder: async function (req, res) {
        try {
            const { name } = req.query; // Lấy tên sản phẩm từ query string            

            // Tìm kiếm sản phẩm theo tên nếu có
            const orders = await OrderModel.searchOrderByName(name);

            // Trả về kết quả tìm kiếm
            res.render('dashboard_order', {
                title: 'Order Dashboard',
                orders,
                searchQuery: name || ''
            });
        } catch (error) {
            console.error('Error searching customer:', error);
            res.status(500).send('Error searching customer');
        }
    }

};

module.exports = OrderController;