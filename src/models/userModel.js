const axios = require('axios');

const apiUrl = 'http://localhost:3000/users'; // Địa chỉ API đăng ký và đăng nhập

// Hàm đăng ký người dùng
const signUp = async (userData) => {
    try {
        const response = await axios.post(`${apiUrl}/signup`, userData);
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        throw error.response.data; // Nếu có lỗi, ném ra thông báo lỗi từ API
    }
};

// Hàm đăng nhập người dùng
const signIn = async (credentials) => {
    try {
        const response = await axios.post(`${apiUrl}/signin`, credentials);
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        throw error.response.data; // Nếu có lỗi, ném ra thông báo lỗi từ API
    }
};

module.exports = { signUp, signIn };