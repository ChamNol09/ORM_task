# Prisma Project Setup Guide

This guide explains how to run a project that uses Prisma after cloning from GitHub.

---

# Requirements

Before starting, make sure you have installed:

- Node.js
- npm or yarn
- MySQL/PostgreSQL database
- Prisma CLI (optional)

Check versions:

```bash
node -v
npm -v
```

---

# Clone Project

Clone the project from GitHub:

```bash
git clone <repository-url>
```

Go to project folder:

```bash
cd <project-name>
```

---

# Install Dependencies

Install project packages:

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

---

# Configure Environment Variables

Create a `.env` file in the root project.

Example:

```env
DATABASE_URL="mysql://root:password@localhost:3306/database_name"
```

Example for MySQL:

```env
DATABASE_URL="mysql://root:123456@localhost:3306/test_db"
```

Example for PostgreSQL:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/test_db"
```

You can check the Prisma schema file:

```txt
prisma/schema.prisma
```

Example:

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

---

# Generate Prisma Client

Generate Prisma Client:

```bash
npx prisma generate
```

This command creates Prisma Client based on your `schema.prisma`.

---

# Database Migration

There are 2 common ways to create tables.

## Option 1: Project Has Migration Files

Check:

```txt
prisma/
├── migrations/
├── schema.prisma
```

If `migrations/` exists, run:

```bash
npx prisma migrate dev
```

This will:

- Create database tables
- Apply all migration history
- Update Prisma Client

Example:

```txt
prisma/
├── migrations/
│   ├── 202605180915_init/
│   └── migration_lock.toml
└── schema.prisma
```

Run:

```bash
npx prisma migrate dev
```

### Production Mode

For production:

```bash
npx prisma migrate deploy
```

---

## Option 2: No Migration Folder

If project only has:

```txt
prisma/
└── schema.prisma
```

Run:

```bash
npx prisma db push
```

This command:

- Creates database tables
- Syncs schema to database
- Does NOT create migration history

Use this only if migration files do not exist.

---

# Prisma Useful Commands

Generate Prisma Client:

```bash
npx prisma generate
```

Create Migration:

```bash
npx prisma migrate dev --name init
```

Push Schema to Database:

```bash
npx prisma db push
```

Reset Database:

```bash
npx prisma migrate reset
```

Open Prisma Studio:

```bash
npx prisma studio
```

Studio URL:

```txt
http://localhost:5555
```

---

# Run Project

Start development server:

```bash
npm run dev
```

Or:

```bash
npm start
```

---

# Full Setup Flow

Example full setup after cloning:

```bash
git clone <repository-url>

cd <project-name>

npm install

npx prisma generate

npx prisma migrate dev

npm run dev
```

---

# Troubleshooting

## Error: DATABASE_URL not found

Make sure `.env` exists:

```env
DATABASE_URL="mysql://root:password@localhost:3306/database_name"
```

---

## Error: Access denied for database

Check:

- Database username
- Password
- Database name
- Database server is running

Example:

```env
DATABASE_URL="mysql://root:123456@localhost:3306/test_db"
```

---

## Error: Migration failed

Reset database:

```bash
npx prisma migrate reset
```

Then rerun:

```bash
npx prisma migrate dev
```

---

# Project Structure Example

```txt
project-name/
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── node_modules/
├── src/
├── .env
├── package.json
└── README.md
```

---

# Notes

- Use `migrate dev` if project contains migration files.
- Use `db push` only if migration files do not exist.
- Always run `prisma generate` after schema changes.
