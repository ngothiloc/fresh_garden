const AuthModel = require('../models/authModel');
const bcrypt = require('bcrypt'); // Thư viện mã hóa mật khẩu

const authController = {
    // Hiển thị trang đăng ký
    renderSignUpPage: (req, res) => {
        res.render('signUp');
    },

    // Hiển thị trang đăng nhập
    renderSignInPage: (req, res) => {
        res.render('signIn');
    },

    // Xử lý đăng ký
    registerUser: async (req, res) => {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        try {
            const existingUser = await AuthModel.findUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'Email is already registered.' });
            }

            // Mã hóa mật khẩu
            const hashedPassword = await bcrypt.hash(password, 10);

            // Thêm người dùng vào cơ sở dữ liệu
            await AuthModel.addUser({ name, email, password: hashedPassword });

            // Chuyển hướng đến trang đăng nhập
            res.redirect('/auth/login'); // Chuyển hướng đến trang signIn.ejs        
        } catch (error) {
            console.error('Register Error:', error);
            res.status(500).json({ message: 'Server error during registration.' });
        }
    },

    // Xử lý đăng nhập
    loginUser: async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        try {
            const user = await AuthModel.findUserByEmail(email);
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            // So sánh mật khẩu
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials.' });
            }

            // Chuyển hướng đến trang index
            res.redirect('/'); // Chuyển hướng đến trang chính (index)

        } catch (error) {
            console.error('Login Error:', error);
            res.status(500).json({ message: 'Server error during login.' });
        }
    },
};

module.exports = authController;