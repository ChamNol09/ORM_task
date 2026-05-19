const prisma = require("../config/prisma");

const findByID = async (id) => {
  return await prisma.roles.findUnique({
    where: {
      id: Number(id),
    },
  });
};

const create = async (data) => {
  let result = await prisma.roles.create({
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
        name: {
          contains: search,
        },
      }
    : {};

  const [roles, total] = await Promise.all([
    prisma.roles.findMany({
      where: whereCondition,
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
      skip,
      take: limit,
      orderBy: {
        [orderBy]: sortBy,
      },
    }),

    prisma.roles.count({
      where: whereCondition,
    }),
  ]);

  return {
    data: roles,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }
  };
};

const update = async (id, data) => {
  return await prisma.roles.update({
    where: {
      id: Number(id),
    },
    data: data,
  });
};

const remove = async (id) => {
  return await prisma.roles.delete({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  findByID,
  create,
  findAll,
  update,
  remove,
};
