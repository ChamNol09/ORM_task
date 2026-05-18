# Prisma ORM with Node.js (MVC + Service Layer)

This guide explains how to use Prisma ORM in a Node.js project following the MVC + Service Layer architecture.

---

# 1. Install Prisma

Create a new project:

```bash
mkdir prisma-demo
cd prisma-demo

npm init -y
```

Install Prisma:

```bash
npm install prisma @prisma/client
```

Initialize Prisma:

```bash
npx prisma init
```

This creates:

```txt
prisma/
  schema.prisma

.env
```

---

# 2. Configure Database

Example MySQL connection inside `.env`

```env
DATABASE_URL="mysql://root:password@localhost:3306/prisma_demo"
```

---

# 3. Create First Table

Open:

```txt
prisma/schema.prisma
```

Example schema:

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

# 4. Create Table in Database

Run migration:

```bash
npx prisma migrate dev --name init
```

What happens:

- Prisma creates SQL migration
- Creates `User` table
- Generates Prisma Client

---

# 5. Generate Prisma Client

```bash
npx prisma generate
```

Why do we use this?

Prisma reads your `schema.prisma` file and generates JavaScript functions/types.

Example generated usage:

```js
prisma.user.create()
prisma.user.findMany()
prisma.user.update()
```

Without `generate`, these functions do not exist.

---

# 6. Create Prisma Connection

Create:

```txt
src/config/prisma.js
```

```js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = prisma;
```

---

# 7. Example MVC + Service Layer Structure

```txt
src/
├── config/
│   └── prisma.js
│
├── modules/
│   └── user/
│       ├── user.controller.js
│       ├── user.service.js
│       ├── user.route.js
│
├── app.js
```

---

# 8. User Service Example

File:

```txt
src/modules/user/user.service.js
```

```js
const prisma = require('../../config/prisma');

const createUser = async (body) => {
  return await prisma.user.create({
    data: body
  });
};

const getUsers = async () => {
  return await prisma.user.findMany();
};

const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id: Number(id)
    }
  });
};

const updateUser = async (id, body) => {
  return await prisma.user.update({
    where: {
      id: Number(id)
    },
    data: body
  });
};

const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: {
      id: Number(id)
    }
  });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
```

---

# 9. User Controller Example

File:

```txt
src/modules/user/user.controller.js
```

```js
const userService = require('./user.service');

const create = async (req, res) => {
  try {
    const result = await userService.createUser(req.body);

    res.json({
      message: 'Create success',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getAll = async (req, res) => {
  try {
    const result = await userService.getUsers();

    res.json({
      data: result
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  create,
  getAll
};
```

---

# 10. User Route Example

File:

```txt
src/modules/user/user.route.js
```

```js
const express = require('express');
const router = express.Router();
const controller = require('./user.controller');

router.post('/', controller.create);
router.get('/', controller.getAll);

module.exports = router;
```

---

# 11. Register Route in app.js

```js
const express = require('express');
const app = express();

app.use(express.json());

const userRoute = require('./src/modules/user/user.route');

app.use('/users', userRoute);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

---

# 12. How to Modify Table in Prisma

To modify a table:

1. Update `schema.prisma`
2. Run migration

---

# Example 1: Add New Column

Before:

```prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
```

Add `phone` column:

```prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
  phone String?
}
```

Run migration:

```bash
npx prisma migrate dev --name add_phone
```

---

# Example 2: Remove Column

Remove:

```prisma
age Int?
```

Then run:

```bash
npx prisma migrate dev --name remove_age
```

---

# Example 3: Rename Column

Before:

```prisma
name String
```

After:

```prisma
fullName String
```

Prisma may:

- remove old column
- create new column

This can lose data.

Recommended approach:

## Step 1

Keep both columns temporarily:

```prisma
model User {
  id       Int    @id @default(autoincrement())
  name     String
  fullName String?
}
```

Run migration.

## Step 2

Copy data manually.

## Step 3

Remove old column.

---

# Example 4: Add Relation

One user has many posts.

```prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String

  posts Post[]
}

model Post {
  id      Int    @id @default(autoincrement())
  title   String

  userId  Int
  user    User @relation(fields: [userId], references: [id])
}
```

Run:

```bash
npx prisma migrate dev --name add_post_relation
```

---

# 13. Prisma Commands You Should Know

| Command | Description |
|---|---|
| `npx prisma init` | Initialize Prisma |
| `npx prisma migrate dev` | Create/update tables |
| `npx prisma generate` | Generate Prisma Client |
| `npx prisma studio` | Open database GUI |
| `npx prisma db push` | Push schema without migration |
| `npx prisma migrate reset` | Reset database |

---

# 14. Difference Between migrate dev and db push

## migrate dev

```bash
npx prisma migrate dev
```

- Creates migration files
- Best for real projects
- Tracks database history

---

## db push

```bash
npx prisma db push
```

- Directly sync schema
- No migration history
- Good for testing

---

# 15. Open Prisma Studio

```bash
npx prisma studio
```

Prisma Studio is similar to phpMyAdmin for Prisma.

You can:

- view data
- edit rows
- delete rows
- inspect relations

---

# 16. Useful Prisma Methods

## Create

```js
await prisma.user.create({
  data: {
    name: 'John',
    email: 'john@gmail.com'
  }
});
```

---

## Find Many

```js
await prisma.user.findMany();
```

---

## Find Unique

```js
await prisma.user.findUnique({
  where: {
    id: 1
  }
});
```

---

## Update

```js
await prisma.user.update({
  where: {
    id: 1
  },
  data: {
    name: 'Updated Name'
  }
});
```

---

## Delete

```js
await prisma.user.delete({
  where: {
    id: 1
  }
});
```

---

# 17. Official Documentation

- https://www.prisma.io/docs
- https://www.prisma.io/docs/orm/prisma-migrate
- https://www.prisma.io/docs/orm/prisma-schema/data-model/relations

