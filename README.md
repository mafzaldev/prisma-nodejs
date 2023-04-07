# PRISMA

Prisma is a tool for creating and managing a database schema. It is a database agnostic tool, which means that it can be used with any database. Prisma is a part of the Prisma ecosystem, which includes the Prisma Client, which is an auto-generated and type-safe database client.

## Why use Prisma?

- Prisma is a database agnostic tool, which means that it can be used with any database.

- Prisma is a part of the Prisma ecosystem, which includes the Prisma Client, which is an auto-generated and type-safe database client.

## How to setup Prisma in Node.js?

1. Create a new directory for your project and initialize it with `npm init -y`

2. Install the following dependencies:

   ```
   npm i express nodemon mysql2
   ```

3. Create a new file called `index.js` and add the following content:

   ```
   const express = require("express");
   const app = express();

   app.listen(3000, () => {
     console.log("Server is running on port 3000");
   });
   ```

4. Install Prisma and Prisma Client:

   ```
   npm i prisma @prisma/client
   ```

5. Create a new file called `prisma/schema.prisma` and add the following content:

   ```
   generator client{
       provider = "prisma-client-js"
   }

   datasource db {
       provider = "mysql"
       url      = env("DATABASE_URL")
   }

   model Student {
      id    Int      @id @default(autoincrement())
      name  String
      age   Int
      email String   @unique
      createdAt DateTime @default(now())
      updatedAt DateTime @updatedAt
   }
   ```

   where generator client is the name of the client that will be generated and datasource db is the name of the database, and DATABASE_URL is the environment variable that will be used to connect to the database,
   and `Student` is the name of the model, and `id`(ID of the record, with autoincrement property),`name`, `age`, `email`, `createdAt` and `updatedAt` are the fields of the model.

6. Run your MySQL server and create a new database called `prisma`
7. Copy the `Connection String` from your MySQL.
8. Create a new file called `.env` and add the copied `Connection String` to `DATABASE_URL` field:

   ```
   DATABASE_URL="mysql://root:password@localhost:3306/prisma"
   ```

9. Run the following command to generate the Prisma Client:

   ```
   npx prisma generate
   ```

10. Run the following command to create a new migration:

    ```
    npx prisma migrate dev --name init --create-only
    ```

    where init is the name of the migration, and --create-only is used to create the migration without running it.

11. Run the following command to deploy the migration:

    ```
    npx prisma migrate deploy
    ```

    After running this command, `Student` table will be added to your MySQL database `prisma`.

## CRUD Operations with Prisma

- Go to `index.js` and create a new instance of Prisma Client as follows:

  ```
  const { PrismaClient } = require("@prisma/client");
  const prisma = new PrismaClient();
  ```

### Create

- Create a new route to create a new student:

  ```
   app.post("/", async (req, res) => {
      const newStudent = await prisma.student.create({data: req.body });
      res.json(newStudent);
   });
  ```

  where `student` is the name of the model, and `req.body` is the data that will be added to the database.

### Read

- Create a new route to get all students:

  ```
   app.get("/", async (req, res) => {
      const allStudents = await prisma.student.findMany();
      res.json(allStudents);
   });
  ```

### Update

- Create a new route to update a student:

  ```
   app.put("/:id", async (req, res) => {
      const id = req.params.id;
      const newEmail = req.body.email;
      const updatedStudent = await prisma.student.update({
         where: { id: parseInt(id) },
         data: { email: newEmail },
      });
      res.json(updatedStudent);
   });
  ```

  where `req.params.id` is the ID of the student, and `req.body.email` is the new email of the student that will be updated.

### Delete

- Create a new route to delete a student:

  ```
   app.delete("/:id", async (req, res) => {
      const deletedStudent = await prisma.student.delete({
         where: { id: Number(req.params.id) },
      });
      res.json(deletedStudent);
   });
  ```

  where `req.params.id` is the ID of the student that will be deleted.
