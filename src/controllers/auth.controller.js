const authService = require("../services/auth.service");

const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    return res.status(200).json({
      result: true,
      message: "Login successful",
      data: result
    });
  } catch (error) {
    return res.status(400).json({
      result: false,
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    await authService.logout(req.user.id);
    return res.status(200).json({
      result: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(400).json({
      result: false,
      message: error.message,
    });
  }
};

module.exports = {
  login,
  logout,
};
