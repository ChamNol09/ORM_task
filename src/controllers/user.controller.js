const userService = require("../services/user.service");

const register = async (req, res) => {
  try {
    const result = await userService.registerUser(req.body);
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const result = await userService.getUsers();
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getById = async (req, res) => {
  try {
    const result = await userService.getById(req.params.id);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const result = await userService.updateUser(req.params.id, req.body);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const removeUser = async (req, res) => {
  try {
    await userService.removeUser(req.params.id);
    return res.status(200).json({
      success: true,
      msg: "Delete user successfully!"
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  getUsers,
  getById,
  updateUser,
  removeUser
};
