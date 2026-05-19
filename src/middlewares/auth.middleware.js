const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");
const userModel = require("../models/user.model");
const roleModel = require("../models/role.model");

const isLogin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        success: false,
        message: "Invalid token format",
      });
    }
    const token = parts[1];
    const decoded = jwt.verify(token, jwtConfig.secret);
    const user = await userModel.findByID(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
    const role = await roleModel.findByID(user.role_id);
    if (!role) {
      return res.status(401).json({
        success: false,
        message: "Role not found",
      });
    }
    req.user = {
      id: user.id,
      email: user.email,
      role: role.name,
    };

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = {
  isLogin,
};
