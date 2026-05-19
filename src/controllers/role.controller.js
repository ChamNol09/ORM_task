const roleService = require("../services/role.service");

const getRoles = async (req, res) => {
  try {
    const result = await roleService.getRoles(req.query);

    res.status(200).json({
      success: true,
      msg: "Get roles successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  getRoles,
};

const createRole = async (req, res) => {
  try {
    const result = await roleService.createRole(req.body);
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getRoleByID = async (req, res) => {
  try {
    const result = await roleService.getRoleByID(req.params.id);
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

const updateRole = async (req, res) => {
  try {
    const result = await roleService.updateRole(req.params.id, req.body);
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

const deleteRole = async (req, res) => {
  try {
    const result = await roleService.deleteRole(req.params.id);
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

module.exports = {
  getRoles,
  createRole,
  getRoleByID,
  updateRole,
  deleteRole,
};
