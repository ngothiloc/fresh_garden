
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Authentication Routes
router
    .route('/signIn')
    .get(authController.getSignIn)
    .post(authController.postSignIn);

router
    .route('/signUp')
    .get(authController.getSignUp)
    .post(authController.postSignUp);

module.exports = router;