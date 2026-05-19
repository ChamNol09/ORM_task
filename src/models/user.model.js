const prisma = require("../config/prisma.js");

const findByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      role_id: true,
      createdAt: true,
    },
  });
};

const create = async (data) => {
  let result = await prisma.user.create({
    data,
  });
  return result.id;
};

const findAll = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const search = query.search || "";
  const orderBy = query.orderBy || "createdAt";
  const sortBy = query.sortBy || "desc";

  const skip = (page - 1) * limit;

  const whereCondition = search
    ? {
        OR: [
          {
            name: {
              contains: search,
            },
          },
          {
            email: {
              contains: search,
            },
          },
        ],
      }
    : {};

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where: whereCondition,

      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },

      skip,
      take: limit,

      orderBy: {
        [orderBy]: sortBy,
      },
    }),

    prisma.user.count({
      where: whereCondition,
    }),
  ]);

  return {
    data: users,

    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }
  };
};

const findByID = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      name: true,
      email: true,
      role_id: true,
      token: true,
      createdAt: true,
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

const insertToken = async (id, token) => {
  return await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      token: token,
    },
  });
};

const removeToken = async (id) => {
  return await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      token: null,
    },
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
  insertToken,
  removeToken,
};
