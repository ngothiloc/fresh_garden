const axios = require('axios');

const ORDER_API_URL = 'http://localhost:3000/order';

const OrderModel = {
    getAllOrder: async function () {
        try {
            const response = await axios.get(ORDER_API_URL);
            return response.data;  // Trả về danh sách sản phẩm
        } catch (error) {
            console.error('Error fetching order:', error);
            return [];  // Trả về mảng trống nếu có lỗi
        }
    },

    createOrder: async function (orderData) {
        try {
            const response = await axios.post(ORDER_API_URL, orderData);
            return response.data;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    },

    // Tìm kiếm sản phẩm theo tên
    searchOrderByName: async function (name) {
        try {
            const response = await axios.get(`${ORDER_API_URL}/search`, { params: { name } });
            return response.data;  // Trả về danh sách sản phẩm tìm được
        } catch (error) {
            console.error('Error searching customer:', error);
            return [];  // Trả về mảng trống nếu có lỗi
        }
    }
};

module.exports = OrderModel;