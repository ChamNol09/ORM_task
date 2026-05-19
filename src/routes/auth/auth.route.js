const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth.controller');
const { authLimiter } = require('../../middlewares/rateLimit.middleware');
const { isLogin } = require('../../middlewares/auth.middleware');

router.post('/login', authLimiter, authController.login);
// router.post('/register', authLimiter, authController.register);
// router.post('/get-me', authController.getProfile);
router.post('/logout', isLogin, authController.logout);

module.exports = router;