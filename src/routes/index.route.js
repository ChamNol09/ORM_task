const express = require('express');
const router = express.Router();
const authRoute = require('./auth/auth.route');
const userRoute = require('./users/user.route');
const roleRoute = require('./roles/role.route');
router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/role', roleRoute);
module.exports = router;
