const axios = require('axios');

const CATEGORY_API_URL = 'http://localhost:3000/category';

const CategoryModel = {
    getAllCategories: async function () {
        try {
            const response = await fetch(CATEGORY_API_URL);
            if (!response.ok) throw new Error('Failed to fetch categories');
            return await response.json();
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    },

    searchCategoriesByName: async function (name) {
        try {
            const response = await axios.get(`${CATEGORY_API_URL}/search`, { params: { name } });
            return response.data;  // Trả về danh sách sản phẩm tìm được
        } catch (error) {
            console.error('Error searching Categories:', error);
            return [];  // Trả về mảng trống nếu có lỗi
        }
    },

    // Thêm sản phẩm
    addCategories: async function (data) {
        try {
            const response = await axios.post(CATEGORY_API_URL, data);
            return response.data;  // Trả về kết quả từ API
        } catch (error) {
            console.error('Error adding category:', error);
            throw error;
        }
    },
};

module.exports = CategoryModel;