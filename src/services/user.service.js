const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');

const registerUser = async (body) => {

    const checkEmail = await userModel.findByEmail(body.email);

    if (checkEmail) {
        throw new Error('Email already exists');
    }

    const hashPassword = await bcrypt.hash(body.password, 10);

    let result =  await userModel.create({
        name: body.name,
        email: body.email,
        password: hashPassword
    });
    let row = await userModel.findByID(result);
    return row;
};

const getUsers = async (query) => {
  return await userModel.findAll(query);
};

const getById = async (id) => {
    let row = await userModel.findByID(id);
    if(!row || row.length === 0){
        throw new Error("Cannot find this user!");
    }
    return row;
}

const updateUser = async (id, body) => {
    let checkUser = await userModel.findByID(id);
    if(!checkUser || checkUser.length === 0){
        throw new Error("Cannot find this user!");
    }
    let data = {
        name: body.name,
        email: body.email
    }
    if(body.password){
        data.password = await bcrypt.hash(body.password, 10);
    }
    await userModel.update(id, data);
    let result = await userModel.findByID(id);
    return result;
}

const removeUser = async (id) => {
    let checkUser = await userModel.findByID(id);
    if(!checkUser || checkUser.length === 0){
        throw new Error("Cannot find this user!");
    }
    await userModel.remove(id);
}

module.exports = {
    registerUser,
    getUsers,
    getById,
    updateUser,
    removeUser
};