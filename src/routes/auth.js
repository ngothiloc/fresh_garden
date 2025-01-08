
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Sign Up and Sign In Pages
// router.get('/signUp', (req, res) => res.render('signUp', { title: 'Đăng ký' }));
// router.get('/signIn', (req, res) => res.render('signIn', { title: 'Đăng nhập' }));

// Authentication Routes
// router
//     .route('/signIn')
//     .get(authController.getSignIn)
//     .post(authController.postSignIn);

// router
//     .route('/signUp')
//     .get(authController.getSignUp)
//     .post(authController.postSignUp);

// Hiển thị trang đăng nhập
router.get('/login', authController.renderSignInPage);

// Hiển thị trang đăng ký
router.get('/register', authController.renderSignUpPage);

// Xử lý đăng ký
router.post('/register', authController.registerUser);

// Xử lý đăng nhập
router.post('/login', authController.loginUser);

module.exports = router;