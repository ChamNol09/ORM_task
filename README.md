# Prisma ORM with Node.js (MVC + Service Layer)

This project demonstrates how to use Prisma ORM in a Node.js application following the MVC + Service Layer architecture.

---

# Technologies Used

- Node.js
- Express.js
- Prisma ORM
- MySQL
- MVC Architecture
- Service Layer Pattern

---

# Project Structure

```txt
src/
│
├── config/
│   └── prisma.js
│
├── controllers/
│   └── user.controller.js
│
├── services/
│   └── user.service.js
│
├── routes/
│   └── user.route.js
│
├── prisma/
│   └── schema.prisma
│
├── app.js
└── server.js
```

---

# What is Prisma ORM?

Prisma is a modern ORM for Node.js and TypeScript.

It helps developers:

- Communicate with database using JavaScript
- Avoid writing raw SQL queries
- Generate type-safe database queries
- Manage migrations easily
- Improve code readability

---

# MVC + Service Layer Flow

```txt
Route
  ↓
Controller
  ↓
Service Layer
  ↓
Prisma ORM
  ↓
Database
```

---

# Installation

## 1. Clone Project

```bash
git clone <your-repository-url>
cd prisma-mvc
```

---

## 2. Install Dependencies

```bash
npm install
```

---

# Prisma Installation

Install Prisma packages:

```bash
npm install prisma @prisma/client
```

Install Express:

```bash
npm install express
```

Install Nodemon:

```bash
npm install -D nodemon
```

---

# Initialize Prisma

Run:

```bash
npx prisma init
```

This creates:

```txt
prisma/schema.prisma
.env
```

---

# Configure Database

Inside `.env`

```env
DATABASE_URL="mysql://root:password@localhost:3306/prisma_mvc"
```

Example:

```env
DATABASE_URL="mysql://root:1234@localhost:3306/prisma_mvc"
```

---

# Prisma Schema

File:

```txt
prisma/schema.prisma
```

Example:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
}
```

---

# Run Migration

Create database tables:

```bash
npx prisma migrate dev --name init
```

This command:

- Creates migration files
- Updates database
- Generates Prisma Client

---

# Generate Prisma Client

```bash
npx prisma generate
```

Why we use this:

Prisma reads `schema.prisma` and generates Prisma Client.

This allows you to use:

```javascript
prisma.user.findMany();
```

Without generating, Prisma models will not exist in Node.js.

---

# Prisma Configuration

## `src/config/prisma.js`

```javascript
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = prisma;
```

---

# Service Layer

## `src/services/user.service.js`

```javascript
const prisma = require("../config/prisma");

const createUser = async (body) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password,
    },
  });

  return user;
};

const getUsers = async () => {
  return await prisma.user.findMany();
};

const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
};
```

---

# Controller Layer

## `src/controllers/user.controller.js`

```javascript
const userService = require("../services/user.service");

const create = async (req, res) => {
  try {
    const result = await userService.createUser(req.body);

    res.status(201).json({
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getAll = async (req, res) => {
  const result = await userService.getUsers();

  res.json({
    data: result,
  });
};

module.exports = {
  create,
  getAll,
};
```

---

# Route Layer

## `src/routes/user.route.js`

```javascript
const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.post("/", userController.create);
router.get("/", userController.getAll);

module.exports = router;
```

---

# Express App

## `src/app.js`

```javascript
const express = require("express");

const userRoute = require("./routes/user.route");

const app = express();

app.use(express.json());

app.use("/users", userRoute);

module.exports = app;
```

---

# Server

## `src/server.js`

```javascript
const app = require("./app");

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

# Package.json Script

```json
"scripts": {
  "dev": "nodemon src/server.js"
}
```

Run project:

```bash
npm run dev
```

---

# API Endpoints

## Create User

```http
POST /users
```

Body:

```json
{
  "name": "John",
  "email": "john@gmail.com",
  "password": "123456"
}
```

---

## Get All Users

```http
GET /users
```

---

## Get User By ID

```http
GET /users/1
```

---

# Common Prisma Methods

## findMany()

```javascript
await prisma.user.findMany();
```

---

## findUnique()

```javascript
await prisma.user.findUnique({
  where: {
    id: 1,
  },
});
```

---

## create()

```javascript
await prisma.user.create({
  data: {
    name: "John",
  },
});
```

---

## update()

```javascript
await prisma.user.update({
  where: {
    id: 1,
  },
  data: {
    name: "New Name",
  },
});
```

---

## delete()

```javascript
await prisma.user.delete({
  where: {
    id: 1,
  },
});
```

---

# Useful Prisma Commands

## Open Prisma Studio

```bash
npx prisma studio
```

---

## Reset Database

```bash
npx prisma migrate reset
```

---

## Push Schema Without Migration

```bash
npx prisma db push
```

---

# Best Practice

## Controller

Only handle:

- Request
- Response
- Status code

---

## Service Layer

Handle:

- Business logic
- Database queries
- Validation

---

## Prisma

Handle:

- Database communication

---

# Advantages of Prisma

- Clean syntax
- Easy CRUD operations
- Relation support
- Auto-completion
- Type safety
- Faster development
- Better code structure

---

# Official Documentation

- [https://www.prisma.io](https://www.prisma.io)
- [https://www.prisma.io/docs](https://www.prisma.io/docs)
- [https://expressjs.com](https://expressjs.com)
- [https://nodejs.org](https://nodejs.org)
