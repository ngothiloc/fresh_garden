const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Hiển thị trang đăng nhập
router.get('/login', authController.renderSignInPage);

// Hiển thị trang đăng ký
router.get('/register', authController.renderSignUpPage);

// Xử lý đăng ký
router.post('/register', authController.registerUser);

// Xử lý đăng nhập
router.post('/login', authController.loginUser);

module.exports = router;