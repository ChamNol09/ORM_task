const roleModel = require("../models/role.model");

const getRoles = async (query) => {
  return await roleModel.findAll(query);
};

const createRole = async (body) => {
  let result = await roleModel.create({
    name: body.name,
  });
  let row = await roleModel.findByID(result);
  return row;
};

const getRoleByID = async (id) => {
  let role = await roleModel.findByID(id);
  if (!role || role.length === 0) {
    throw new Error("Cannot find this role!");
  }
  return role;
};

const updateRole = async (id, body) => {
  let checkRole = await roleModel.findByID(id);
  if (!checkRole || checkRole.length === 0) {
    throw new Error("Cannot find this role!");
  }
  await roleModel.update(id, {
    name: body.name,
  });
  let result = await roleModel.findByID(id);
  return result;
};

const deleteRole = async (id) => {
    let checkRole = await roleModel.findByID(id);
    if (!checkRole || checkRole.length === 0) {
        throw new Error("Cannot find this role!");
    }
  return await roleModel.remove(id);
};

module.exports = {
  getRoles,
  createRole,
  getRoleByID,
  updateRole,
  deleteRole,
};
