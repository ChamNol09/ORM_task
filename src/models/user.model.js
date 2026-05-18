const prisma = require("../config/prisma.js");

const findByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
    select: {
      name: true,
      email: true,
      createdAt: true,
    },
  });
};
const create = async (data) => {
  return await prisma.user.create({
    data,
  });
};
const findAll = async () => {
  return await prisma.user.findMany({
    select: {
      name: true,
      email: true,
      createdAt: true,
    },
  });
};

const findByID = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
};
const update = async (id, data) => {
  return await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: data,
  });
};

const remove = async (id) => {
  return await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  findByEmail,
  create,
  findAll,
  findByID,
  remove,
  update,
};
