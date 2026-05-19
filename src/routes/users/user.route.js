const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user.controller");
const { authLimiter } = require("../../middlewares/rateLimit.middleware");
const { isLogin } = require("../../middlewares/auth.middleware");

router.get("/users", authLimiter, isLogin, userController.getUsers);
router.post("/register", userController.register);
router.get("/user/:id", isLogin, userController.getById);
router.put("/update/:id", isLogin, userController.updateUser);
router.delete("/remove/:id", isLogin, userController.removeUser);

module.exports = router;
