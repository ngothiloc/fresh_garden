const axios = require('axios');

const PRODUCTS_API_URL = 'http://localhost:3000/products'; // URL API sản phẩm
const CATEGORY_API_URL = 'http://localhost:3000/category'; // URL API sản phẩm

const ProductModel = {
    // Lấy tất cả sản phẩm
    getAllProducts: async function () {
        try {
            const response = await axios.get(PRODUCTS_API_URL);
            return response.data;  // Trả về danh sách sản phẩm
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];  // Trả về mảng trống nếu có lỗi
        }
    },
    // Lấy danh sách các danh mục
    getCategories: async function () {
        try {
            const response = await axios.get(CATEGORY_API_URL);
            return response.data; // Trả về danh sách các danh mục
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    },

    // Thêm sản phẩm
    addProduct: async function (data) {
        try {
            const response = await axios.post(PRODUCTS_API_URL, data);
            return response.data;  // Trả về kết quả từ API
        } catch (error) {
            console.error('Error adding product:', error);
            throw error;
        }
    },

    // Tìm kiếm sản phẩm theo tên
    searchProductsByName: async function (name) {
        try {
            const response = await axios.get(`${PRODUCTS_API_URL}/search`, { params: { name } });
            return response.data;  // Trả về danh sách sản phẩm tìm được
        } catch (error) {
            console.error('Error searching products:', error);
            return [];  // Trả về mảng trống nếu có lỗi
        }
    }
};

module.exports = ProductModel;