const express = require("express");
const router = express.Router();
const roleController = require("../../controllers/role.controller");
const { isLogin } = require("../../middlewares/auth.middleware");
router.get("/roles", isLogin, roleController.getRoles);
router.post("/create", isLogin, roleController.createRole);
router.get("/role/:id", isLogin, roleController.getRoleByID);
router.put("/update/:id", isLogin, roleController.updateRole);
router.delete("/remove/:id", isLogin, roleController.deleteRole);

module.exports = router;