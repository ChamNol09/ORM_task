const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/register', userController.register);
router.get('/users', userController.getUsers);
router.get('/user/:id', userController.getById);
router.put('/update/:id', userController.updateUser);
router.delete('/remove/:id', userController.removeUser);

module.exports = router;