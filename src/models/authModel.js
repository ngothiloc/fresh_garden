const axios = require('axios');

const USERS_API_URL = 'http://localhost:3000/users';

const AuthModel = {
    // Lấy tất cả người dùng
    getAllUsers: async function () {
        try {
            const response = await axios.get(USERS_API_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Unable to fetch users.');
        }
    },

    // Thêm người dùng mới
    addUser: async function (user) {
        try {
            const response = await axios.post(USERS_API_URL, user);
            return response.data;
        } catch (error) {
            console.error('Error adding user:', error);
            throw new Error('Unable to add user.');
        }
    },

    // Kiểm tra thông tin đăng nhập
    findUserByEmail: async function (email) {
        try {
            const response = await axios.get(USERS_API_URL);
            const users = response.data;
            return users.find(user => user.email === email);
        } catch (error) {
            console.error('Error finding user:', error);
            throw new Error('Unable to find user.');
        }
    },
};

module.exports = AuthModel;