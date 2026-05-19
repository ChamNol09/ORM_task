const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");
const userModel = require("../models/user.model");
const roleModel = require("../models/role.model");

const login = async (body) => {
  if (!body.email || !body.password) {
    throw new Error("Email and password are required");
  }
  const user = await userModel.findByEmail(body.email);
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isMatch = bcrypt.compareSync(body.password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }
  const role = await roleModel.findByID(user.role_id);
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: role.name,
    },
    jwtConfig.secret,
    {
      expiresIn: jwtConfig.expireIn,
    }
  );
  await userModel.insertToken(user.id, token);
  let row = await userModel.findByID(user.id);
  console.log(row);
  
  return row;
};

const logout = async (userId) => {
    await userModel.removeToken(userId);
    };

module.exports = {
  login,
  logout,
};