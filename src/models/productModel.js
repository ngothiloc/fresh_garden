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

    deleteProduct: async function (id) {
        try {
            const response = await axios.delete(`${PRODUCTS_API_URL}/${id}`);
            if (response.status === 200) {
                return true;  // Trả về true nếu xóa thành công
            } else {
                console.error('Failed to delete product. Status:', response.status);
                return false;  // Trả về false nếu xóa không thành công
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            return false;  // Trả về false nếu có lỗi
        }
    }
};

module.exports = ProductModel;